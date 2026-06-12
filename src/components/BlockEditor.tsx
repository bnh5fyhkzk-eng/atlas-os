// BlockNote editor wrapper · Notion-style blocks
// Per FOUNDATION-REBUILD Phase 2 · /arm/curiosity canary
import { Component, useEffect, useMemo, useRef, type ReactNode } from "react";
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  type Block as BNBlock,
} from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

export interface BlockEditorProps {
  initialDoc?: unknown;
  onChange?: (doc: BNBlock[]) => void;
  editable?: boolean;
  placeholder?: string;
}

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
  },
});

// A malformed block (e.g. invalid table from an AI writer) must never blank the
// whole app — caught live 2026-06-12 when a bad table white-screened the house.
class EditorBoundary extends Component<{ raw: unknown; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    const text = (() => {
      try {
        const blocks = this.props.raw;
        if (Array.isArray(blocks)) {
          return blocks.map((b) => {
            const c = (b as { content?: unknown }).content;
            return Array.isArray(c)
              ? c.map((s) => (s as { text?: string }).text ?? "").join("")
              : JSON.stringify(c).slice(0, 200);
          }).join("\n");
        }
        return String(blocks).slice(0, 2000);
      } catch { return "(unreadable content)"; }
    })();
    return (
      <div className="p-4 text-sm">
        <div className="mb-2 rounded border px-2 py-1 text-xs" style={{ borderColor: "#d9730d", color: "#d9730d" }}>
          ⚠️ note has a block the editor can't render · showing raw text
        </div>
        <pre className="whitespace-pre-wrap text-sm" style={{ fontFamily: "inherit" }}>{text}</pre>
      </div>
    );
  }
}

export function BlockEditor(props: BlockEditorProps) {
  return (
    <EditorBoundary raw={props.initialDoc}>
      <BlockEditorInner {...props} />
    </EditorBoundary>
  );
}

function BlockEditorInner({
  initialDoc,
  onChange,
  editable = true,
  placeholder,
}: BlockEditorProps) {
  const initial = useMemo<BNBlock[] | undefined>(() => {
    if (!initialDoc) return undefined;
    if (Array.isArray(initialDoc)) return initialDoc as BNBlock[];
    return undefined;
  }, [initialDoc]);

  const editor = useCreateBlockNote({
    schema,
    initialContent: initial && initial.length > 0 ? initial : undefined,
  });

  // Debounce save · 500ms after typing stops
  const saveTimer = useRef<number | null>(null);
  useEffect(() => {
    if (!editor || !onChange) return;
    const handler = () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => {
        try {
          onChange(editor.document as BNBlock[]);
        } catch (e) {
          console.error("[BlockEditor] onChange failed", e);
        }
      }, 500);
    };
    const off = editor.onChange(handler);
    return () => {
      off?.();
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [editor, onChange]);

  if (!editor) return <div className="p-4 text-sm opacity-60">Loading editor…</div>;

  return (
    <div
      className="atlas-blocknote-wrap"
      data-placeholder={placeholder || "Type / for commands"}
    >
      <BlockNoteView editor={editor} editable={editable} theme="light" />
    </div>
  );
}
