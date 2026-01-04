"use client";

import { EditorActions } from "./editor/EditorActions";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CVData } from "@/lib/types";

interface HeaderProps {
  isAIOpen: boolean;
  setIsAIOpen: (open: boolean) => void;
  settings: CVData["settings"];
  updateSettings: (settings: Partial<CVData["settings"]>) => void;
  updateData: (newData: Partial<CVData>) => void;
}

export function Header({
  isAIOpen,
  setIsAIOpen,
  settings,
  updateSettings,
  updateData,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white/80 px-4 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Untitled Resume
        </h2>
      </div>
      <EditorActions
        isAIOpen={isAIOpen}
        setIsAIOpen={setIsAIOpen}
        settings={settings}
        updateSettings={updateSettings}
        updateData={updateData}
      />
    </header>
  );
}
