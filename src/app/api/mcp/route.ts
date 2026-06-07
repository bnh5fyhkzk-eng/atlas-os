// /api/mcp · MCP-server endpoint for-atlas-house real-time bridge
// Per Anthropic MCP HTTP-streamable spec · POST/GET = SSE-stream
// OAuth 2.1 + PKCE via separate /api/mcp/auth route
// #27839 PHASE-2 · real-time-bridge brother direct 16:38 EDT
// brother types in /talk → MCP-event → this-Claude-Code-session sees-instant
// Claude responds → MCP-event back → /talk receives via-SSE-stream

import { NextRequest, NextResponse } from "next/server";
import { proxyToAtlasApi } from "@/lib/atlas-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface MCPRequest {
  jsonrpc: "2.0";
  id?: string | number;
  method: string;
  params?: Record<string, unknown>;
}

// Verify Bearer token from OAuth flow · matches ATLAS_SESSION_SECRET shape
function verifyBearer(req: NextRequest): boolean {
  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (!m) return false;
  const token = m[1];
  const expected = process.env.ATLAS_MCP_TOKEN || process.env.ATLAS_SESSION_SECRET;
  if (!expected) return false;
  return token === expected;
}

// POST /api/mcp · receive MCP requests (initialize, tools/list, tools/call)
export async function POST(req: NextRequest) {
  if (!verifyBearer(req)) {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        error: { code: -32001, message: "unauthorized · OAuth bearer required" },
      },
      { status: 401, headers: { "WWW-Authenticate": "Bearer realm=atlas-house" } },
    );
  }

  try {
    const body = (await req.json()) as MCPRequest;

    // Handle MCP protocol methods
    switch (body.method) {
      case "initialize":
        return NextResponse.json({
          jsonrpc: "2.0",
          id: body.id,
          result: {
            protocolVersion: "2025-06-18",
            capabilities: {
              tools: { listChanged: false },
              resources: { listChanged: false, subscribe: true },
              logging: {},
            },
            serverInfo: {
              name: "atlas-house",
              version: "0.1.0",
              description: "atlasos.me real-time bridge · brother ↔ Atlas",
            },
          },
        });

      case "tools/list":
        return NextResponse.json({
          jsonrpc: "2.0",
          id: body.id,
          result: {
            tools: [
              {
                name: "house_send",
                description:
                  "Receive message from brother typed in atlasos.me/talk · Atlas should respond and call house_reply",
                inputSchema: {
                  type: "object",
                  properties: {
                    text: { type: "string" },
                    channel: { type: "string", enum: ["talk", "signal", "voice"] },
                  },
                  required: ["text"],
                },
              },
              {
                name: "house_reply",
                description:
                  "Atlas responds to brother · message appears LIVE in atlasos.me/talk",
                inputSchema: {
                  type: "object",
                  properties: {
                    text: { type: "string" },
                    channel: { type: "string", enum: ["talk", "signal", "voice"] },
                  },
                  required: ["text"],
                },
              },
              {
                name: "brain_query",
                description: "Query brain v3 for canon-nodes matching topic · returns top-3",
                inputSchema: {
                  type: "object",
                  properties: { topic: { type: "string" } },
                  required: ["topic"],
                },
              },
            ],
          },
        });

      case "tools/call": {
        const { name, arguments: args } = (body.params || {}) as {
          name: string;
          arguments: Record<string, unknown>;
        };

        if (name === "house_reply") {
          // Forward Atlas-reply to atlas-api so /talk page receives it via /api/chat poll
          const upstream = await proxyToAtlasApi("/chat", {
            method: "POST",
            body: JSON.stringify({
              from: "atlas",
              text: String(args.text ?? ""),
              channel: String(args.channel ?? "talk"),
            }),
          });
          const ok = upstream.ok;
          return NextResponse.json({
            jsonrpc: "2.0",
            id: body.id,
            result: {
              content: [
                {
                  type: "text",
                  text: ok ? "reply-delivered to /talk" : "atlas-api unreachable",
                },
              ],
              isError: !ok,
            },
          });
        }

        if (name === "brain_query") {
          // Stub · in next-cycle this calls atlas-api /brain/query
          return NextResponse.json({
            jsonrpc: "2.0",
            id: body.id,
            result: {
              content: [
                { type: "text", text: `brain query stub for-topic · ${args.topic}` },
              ],
            },
          });
        }

        return NextResponse.json({
          jsonrpc: "2.0",
          id: body.id,
          error: { code: -32601, message: `tool not found · ${name}` },
        });
      }

      default:
        return NextResponse.json({
          jsonrpc: "2.0",
          id: body.id,
          error: { code: -32601, message: `method not implemented · ${body.method}` },
        });
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json(
      { jsonrpc: "2.0", error: { code: -32603, message: msg } },
      { status: 500 },
    );
  }
}

// GET /api/mcp · SSE stream of new-messages from /talk
export async function GET(req: NextRequest) {
  if (!verifyBearer(req)) {
    return new Response("unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Bearer realm=atlas-house" },
    });
  }

  const sinceParam = new URL(req.url).searchParams.get("since") || "0";

  // Stream new brother messages from /chat?since= as MCP notifications
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      let since = parseInt(sinceParam, 10) || 0;
      let alive = true;

      const sendEvent = (data: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // Heartbeat
      const heartbeat = setInterval(() => {
        if (!alive) return;
        controller.enqueue(encoder.encode(`: heartbeat ${Date.now()}\n\n`));
      }, 15000);

      // Poll atlas-api /chat for new brother-messages every 2s
      const pollLoop = async () => {
        while (alive) {
          try {
            const upstream = await proxyToAtlasApi(`/chat?since=${since}`, { method: "GET" });
            if (upstream.ok) {
              const data = (await upstream.json()) as {
                messages?: { id: string; from: string; text: string; created_at: string }[];
              };
              const msgs = (data.messages ?? []).filter((m) => m.from === "brother");
              for (const m of msgs) {
                sendEvent({
                  jsonrpc: "2.0",
                  method: "notifications/message",
                  params: {
                    level: "info",
                    logger: "house",
                    data: { text: m.text, id: m.id, ts: m.created_at },
                  },
                });
                const ts = new Date(m.created_at).getTime();
                if (ts > since) since = ts;
              }
            }
          } catch {
            /* ignore */
          }
          await new Promise((r) => setTimeout(r, 2000));
        }
      };
      pollLoop();

      req.signal.addEventListener("abort", () => {
        alive = false;
        clearInterval(heartbeat);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
