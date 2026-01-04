"use client";

import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { ensureHtmlFormat } from "@/lib/utils";
import type { CVData } from "@/lib/types";
import { parseResumeFromPdf } from "@/lib/gemini";
import { Upload, Sparkles, Loader2 } from "lucide-react";
import { AiConsentDialog } from "@/components/AiConsentDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const formatImportedData = (data: Partial<CVData>): Partial<CVData> => {
  const formatted = { ...data };

  // Format Summary
  if (formatted.summary) {
    formatted.summary = ensureHtmlFormat(formatted.summary);
  }

  // Format Work Experience
  if (Array.isArray(formatted.experience)) {
    formatted.experience = formatted.experience.map((exp) => ({
      ...exp,
      description: ensureHtmlFormat(exp.description),
    }));
  }

  // Format Custom Sections
  if (Array.isArray(formatted.customSections)) {
    formatted.customSections = formatted.customSections.map((section) => ({
      ...section,
      description: ensureHtmlFormat(section.description),
    }));
  }

  return formatted;
};

export interface ImportActionHandle {
  open: () => void;
}

interface ImportActionProps {
  updateData: (newData: Partial<CVData>) => void;
}

export const ImportAction = forwardRef<ImportActionHandle, ImportActionProps>(
  ({ updateData }, ref) => {
    const [isImporting, setIsImporting] = useState(false);
    const [showUploadDialog, setShowUploadDialog] = useState(false);
    const [showImportConsent, setShowImportConsent] = useState(false);
    const [pendingFile, setPendingFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        setShowUploadDialog(true);
      },
    }));

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const consent = localStorage.getItem("ai-consent-granted");
      if (file.type === "application/json" || consent === "true") {
        handleFileUpload(file);
      } else {
        setPendingFile(file);
        setShowImportConsent(true);
      }
      e.target.value = "";
    };

    const handleFileUpload = async (file: File) => {
      setIsImporting(true);
      setShowImportConsent(false);

      try {
        if (file.type === "application/json") {
          const text = await file.text();
          const json = JSON.parse(text);
          const formatted = formatImportedData(json);
          updateData(formatted);
          setIsImporting(false);
          setShowUploadDialog(false);
          return;
        }

        // For PDF and other files, use AI parsing
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const base64Data = (reader.result as string).split(",")[1];
          try {
            const parsedData = await parseResumeFromPdf(base64Data, file.type);
            if (parsedData) {
              const formatted = formatImportedData(parsedData);
              updateData(formatted);
              setShowUploadDialog(false);
            }
          } catch (err) {
            console.error(err);
            alert("Failed to parse file with AI.");
          } finally {
            setIsImporting(false);
            setPendingFile(null);
          }
        };
      } catch (err) {
        console.error(err);
        alert("Failed to upload file.");
        setIsImporting(false);
        setPendingFile(null);
      }
    };

    return (
      <>
        {/* Upload Dialog */}
        <Dialog
          open={showUploadDialog}
          onOpenChange={(open) =>
            !isImporting && !open && setShowUploadDialog(false)
          }
        >
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Import Resume</DialogTitle>
              <DialogDescription>
                Upload your existing resume to automatically fill your CV data.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <button
                className={`w-full border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isImporting
                    ? "border-purple-200 bg-purple-50 dark:bg-purple-900/10"
                    : "border-zinc-200 dark:border-zinc-800 hover:border-purple-500 hover:bg-purple-50/10 cursor-pointer"
                }`}
                onClick={() => !isImporting && fileInputRef.current?.click()}
                disabled={isImporting}
                type="button"
              >
                {isImporting ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                        Analyzing your resume...
                      </p>
                      <p className="text-xs text-purple-700 dark:text-purple-300">
                        This might take a few seconds
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-white dark:bg-zinc-950 rounded-full shadow-sm mb-2 text-purple-700 ring-1 ring-zinc-100 dark:ring-zinc-800">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      Click to upload a file
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Supports PDF, JSON, MD, TXT
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.md,.txt,.json"
                  className="hidden"
                  onChange={handleFileSelect}
                  disabled={isImporting}
                />
              </button>
              <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-md flex gap-3 border border-purple-100 dark:border-purple-900/20">
                <div className="text-purple-600 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs text-purple-800 dark:text-purple-200 leading-relaxed">
                  <span className="font-semibold block mb-1">
                    AI Extract Feature
                  </span>
                  Upload your existing PDF resume and we'll use Gemini AI to
                  intelligently extract and format your information
                  automatically.
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <AiConsentDialog
          open={showImportConsent}
          onOpenChange={setShowImportConsent}
          onAccept={() => {
            if (pendingFile) {
              handleFileUpload(pendingFile);
            }
          }}
        />
      </>
    );
  }
);
ImportAction.displayName = "ImportAction";
