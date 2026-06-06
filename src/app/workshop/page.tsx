// /workshop/page.tsx
// CAVEMAN: atlas-os · NEW split integrator
// PURPOSE: combine ToolsGrid + OutputStream side-by-side
// STONE-50 background · English layout · NO em-dash

'use client';

import { useState, useRef, useCallback } from 'react';
import ToolsGrid from '@/components/ToolsGrid';
import OutputStream from '@/components/OutputStream';

export default function WorkshopPage() {
  const [leftWidth, setLeftWidth] = useState<number>(50); // percentage
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setLeftWidth(Math.min(Math.max(percent, 20), 80)); // clamp 20%-80%
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div className="h-screen flex bg-stone-50 text-stone-900 overflow-hidden">
      {/* LEFT PANEL - ToolsGrid */}
      <div
        className="overflow-auto border-r border-stone-200"
        style={{ width: `${leftWidth}%` }}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Tools Grid</h2>
          <ToolsGrid />
        </div>
      </div>

      {/* RESIZE HANDLE */}
      <div
        className="w-2 cursor-col-resize bg-stone-300 hover:bg-stone-400 active:bg-stone-500 transition-colors shrink-0"
        onMouseDown={handleMouseDown}
      />

      {/* RIGHT PANEL - OutputStream */}
      <div
        className="overflow-auto flex-1"
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Output Stream</h2>
          <OutputStream />
        </div>
      </div>
    </div>
  );
}