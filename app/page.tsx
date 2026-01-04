"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { CVPaper } from "@/components/CVPaper";
import { AIAssistant } from "@/components/AIAssistant";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AiConsentDialog } from "@/components/AiConsentDialog";
import { useCVData } from "@/hooks/useCVData";

export default function Home() {
  const [isAIOpen, setIsAIOpen] = useState(true);
  const {
    data,
    updateHeader,
    updateSummary,
    updateExperience,
    updateCustomSections,
  } = useCVData();

  return (
    <div className="flex h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <AiConsentDialog />
      <Header isAIOpen={isAIOpen} setIsAIOpen={setIsAIOpen} />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex flex-1 flex-col overflow-hidden">
          <ScrollArea className="flex-1 max-h-[calc(100vh-64px)]">
            <div className="flex min-h-full w-full justify-center bg-zinc-100/50 p-4 py-12 dark:bg-zinc-950/50 md:p-12">
              <CVPaper
                data={data}
                updateHeader={updateHeader}
                updateSummary={updateSummary}
                updateExperience={updateExperience}
                updateCustomSections={updateCustomSections}
                className="w-full"
              />
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </main>

        {/* Collapsible AI Panel */}
        <AIAssistant isOpen={isAIOpen} setIsOpen={setIsAIOpen} />
      </div>
    </div>
  );
}
