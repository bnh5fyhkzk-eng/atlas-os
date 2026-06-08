'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';

interface Room {
  label: string;
  path: string;
  icon: string;
}

const rooms: Room[] = [
  { label: 'Home', path: '/', icon: '⌂' },
  { label: 'Focus', path: '/focus', icon: '◉' },
  { label: 'Goals', path: '/goals', icon: '◇' },
  { label: 'Resume', path: '/resume', icon: '↻' },
  { label: 'Jumps', path: '/jumps', icon: '⇄' },
  { label: 'Spine', path: '/spine', icon: '⟐' },
  { label: 'Agents', path: '/agents', icon: '⚙' },
  { label: 'Talk', path: '/talk', icon: '☰' },
  { label: 'Kitchen', path: '/kitchen', icon: '⚗' },
  { label: 'Map', path: '/map', icon: '⌗' },
  { label: 'Cosmos', path: '/map/cosmos', icon: '✦' },
  { label: 'Brain', path: '/memory', icon: '◎' },
  { label: 'Bedroom', path: '/bedroom', icon: '◷' },
  { label: 'Library', path: '/library', icon: '⊟' },
  { label: 'Workshop', path: '/workshop', icon: '⚙' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const currentRoom = rooms.find((r) => {
    if (r.path === '/') return pathname === '/';
    return pathname.startsWith(r.path);
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setSearchOpen((prev) => !prev);
    }
    if (e.key === 'Escape') {
      setSearchOpen(false);
      setSearchQuery('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-stone-950/80 border-b border-stone-800/60">
      <div className="max-w-screen-2xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left: Rooms */}
        <ul className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {rooms.map((room) => {
            const isActive = room === currentRoom;
            return (
              <li key={room.path}>
                <Link
                  href={room.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-stone-700/60 text-stone-100 shadow-inner'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
                  }`}
                >
                  <span className="text-lg leading-none">{room.icon}</span>
                  <span className="hidden sm:inline">{room.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: Search */}
        <div className="relative flex items-center">
          <button
            onClick={() => setSearchOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono text-stone-400 bg-stone-800/40 hover:bg-stone-700/40 border border-stone-700/50 transition"
          >
            <span className="text-base">⌘</span>
            <span>K</span>
          </button>
          {searchOpen && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-stone-900 border border-stone-700 rounded-lg shadow-xl p-2">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rooms, tools, memories..."
                className="w-full bg-stone-800 text-stone-200 placeholder-stone-500 rounded-md px-3 py-2 text-sm border border-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500"
              />
              <div className="mt-2 text-xs text-stone-500 px-2">
                type room name or command
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}