"use client";

import { cn } from "@/lib/utils";
import { CVData } from "@/lib/types";
import { HeaderSection } from "./cv/HeaderSection";
import { SummarySection } from "./cv/SummarySection";
import { ExperienceSection } from "./cv/ExperienceSection";
import { CustomSection } from "./cv/CustomSection";

interface CVPaperProps {
  data: CVData;
  updateHeader: (header: Partial<CVData["header"]>) => void;
  updateSummary: (summary: string) => void;
  updateExperience: (experience: CVData["experience"]) => void;
  updateCustomSections: (sections: CVData["customSections"]) => void;
  className?: string;
}

export function CVPaper({
  data,
  updateHeader,
  updateSummary,
  updateExperience,
  updateCustomSections,
  className,
}: CVPaperProps) {
  return (
    <div className={cn("flex justify-center", className)}>
      <div
        className={cn(
          "w-full max-w-[210mm] bg-white shadow-2xl dark:bg-zinc-950 dark:shadow-zinc-900/20 print:shadow-none min-h-[297mm]",
          data.settings.fontFamily === "classic"
            ? "font-classic"
            : "font-modern"
        )}
      >
        <div className="w-full border border-zinc-100 p-[12mm] dark:border-zinc-900 h-full leading-relaxed">
          <HeaderSection data={data.header} updateHeader={updateHeader} />

          <SummarySection value={data.summary} onChange={updateSummary} />

          <ExperienceSection
            items={data.experience}
            updateExperience={updateExperience}
          />

          <CustomSection
            items={data.customSections}
            updateSections={updateCustomSections}
          />
        </div>
      </div>
    </div>
  );
}
