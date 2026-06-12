// EmbedBlockRenderer · render a single non-native block by its type
// Per FOUNDATION-REBUILD Phase 5
import { CalendarBlock } from "./embeds/CalendarBlock";
import { GmailBlock } from "./embeds/GmailBlock";
import { BrainBlock } from "./embeds/BrainBlock";
import { NotebookLMBlock } from "./embeds/NotebookLMBlock";
import { MCPBlock } from "./embeds/MCPBlock";
import type { Block } from "@/lib/atlas-supabase";

export function EmbedBlockRenderer({ block }: { block: Block }) {
  const props = (block.props || {}) as Record<string, unknown>;
  switch (block.block_type) {
    case "calendar":
      return (
        <CalendarBlock
          calendarId={(props.calendarId as string) ?? "primary"}
          windowHours={(props.windowHours as number) ?? 48}
        />
      );
    case "gmail":
      return (
        <GmailBlock
          label={props.label as string | undefined}
          query={(props.query as string) ?? ""}
          limit={(props.limit as number) ?? 8}
        />
      );
    case "notebooklm":
      return (
        <NotebookLMBlock
          notebookId={(props.notebookId as string) ?? ""}
          label={props.label as string | undefined}
        />
      );
    case "brain":
      return (
        <BrainBlock
          topic={(props.topic as string) ?? "atlas"}
          limit={(props.limit as number) ?? 6}
        />
      );
    case "mcp":
      return (
        <MCPBlock
          server={(props.server as string) ?? ""}
          tool={(props.tool as string) ?? ""}
          args={(props.args as Record<string, unknown>) ?? {}}
        />
      );
    default:
      return null;
  }
}

export const EMBED_TYPES: Array<{ value: string; label: string; defaultProps: Record<string, unknown> }> = [
  { value: "calendar",   label: "📅 Calendar",   defaultProps: { calendarId: "primary", windowHours: 48 } },
  { value: "gmail",      label: "📧 Gmail",      defaultProps: { label: "INBOX", limit: 8 } },
  { value: "brain",      label: "🧠 Brain recall", defaultProps: { topic: "atlas", limit: 6 } },
  { value: "notebooklm", label: "📓 NotebookLM", defaultProps: { notebookId: "" } },
  { value: "mcp",        label: "🔌 MCP tool",   defaultProps: { server: "", tool: "" } },
];
