import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Send,
  PenTool,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AIAssistantProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function AIAssistant({ isOpen, setIsOpen }: AIAssistantProps) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col border-l border-zinc-200 bg-white transition-all duration-300 dark:border-zinc-800 dark:bg-black",
        isOpen ? "w-80" : "w-12"
      )}
    >
      <div className="flex items-center justify-between border-b border-zinc-200 p-2 dark:border-zinc-800">
        {isOpen && (
          <div className="flex items-center gap-2 px-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-semibold">AI Assistant</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      {isOpen && (
        <>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900">
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  How can I help you today?
                </p>
                <p className="mt-1 text-zinc-500 dark:text-zinc-400">
                  I can help you refine your summary, improve bullet points, or
                  analyze your ATS score.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Suggestions
                </h4>
                <div className="grid gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2 h-auto py-2 px-3 text-left leading-tight"
                  >
                    <PenTool className="h-3.5 w-3.5 shrink-0" />
                    <span>Fix grammar & spelling</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2 h-auto py-2 px-3 text-left leading-tight"
                  >
                    <Sparkles className="h-3.5 w-3.5 shrink-0" />
                    <span>Make it more professional</span>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
            <div className="relative">
              <Input placeholder="Ask anything..." className="pr-10" />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full w-10 hover:bg-transparent"
              >
                <Send className="h-4 w-4 text-zinc-400" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
