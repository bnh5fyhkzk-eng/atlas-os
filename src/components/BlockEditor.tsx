// BlockNote editor wrapper · Notion-style blocks
// Per FOUNDATION-REBUILD Phase 2 · /arm/curiosity canary
import { useEffect, useMemo, useRef } from "react";
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

export function BlockEditor({
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
