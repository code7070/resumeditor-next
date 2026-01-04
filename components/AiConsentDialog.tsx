"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sparkles, ShieldCheck } from "lucide-react";

export function AiConsentDialog() {
  const [open, setOpen] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ai-consent-granted");
    if (consent !== "true") {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ai-consent-granted", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
            <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <DialogTitle className="text-xl font-bold">
            AI Consent & Data Usage
          </DialogTitle>
          <DialogDescription className="pt-2">
            To provide you with advanced resume optimization, ATS analysis, and
            multimodal parsing, we use Google Gemini AI.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              How we handle your data
            </h4>
            <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <li>Your CV content is sent securely to Google Gemini APIs.</li>
              <li>Data is processed only for analysis and generation.</li>
              <li>We do not store your personal data on our servers.</li>
              <li>You can revoke this consent at any time in settings.</li>
            </ul>
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <Checkbox
              id="consent"
              checked={hasConsented}
              onCheckedChange={(checked) => setHasConsented(checked === true)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="consent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I understand and agree to the AI data processing
              </Label>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                You must agree to continue using the AI features.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
            disabled={!hasConsented}
            onClick={handleAccept}
          >
            Accept and Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
