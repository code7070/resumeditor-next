"use client";

import { useState } from "react";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { Pencil } from "lucide-react";

interface SummarySectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function SummarySection({ value, onChange }: SummarySectionProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="group relative flex flex-col gap-2 mt-4">
      <h3 className="text-cv-lg font-bold uppercase tracking-wide text-purple-600 border-b-2 border-purple-600 pb-1">
        Professional Summary
      </h3>

      <div className="relative">
        {isEditing ? (
          <RichTextEditor
            value={value}
            onChange={onChange}
            autoFocus
            className="mt-1"
          />
        ) : (
          <div
            role="button"
            tabIndex={0}
            className="prose prose-base text-cv-md dark:prose-invert max-w-none cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded p-2 -mx-2 transition-colors min-h-[50px]"
            onClick={() => setIsEditing(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsEditing(true);
              }
            }}
            dangerouslySetInnerHTML={{
              __html:
                value || "<p>Click to add your professional summary...</p>",
            }}
          />
        )}

        {!isEditing && (
          <Pencil className="absolute -left-6 top-2 opacity-0 group-hover:opacity-100 h-4 w-4 text-zinc-400 transition-opacity" />
        )}

        {isEditing && (
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setIsEditing(false)}
              className="text-xs font-medium text-purple-600 hover:text-purple-700 underline"
            >
              Done Editing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
