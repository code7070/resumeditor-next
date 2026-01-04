"use client";

import {
  Save,
  Undo,
  Redo,
  Share2,
  Sparkles,
  FileUp,
  FileDown,
  Search,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface EditorActionsProps {
  isAIOpen: boolean;
  setIsAIOpen: (open: boolean) => void;
}

export function EditorActions({ isAIOpen, setIsAIOpen }: EditorActionsProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <div className="mr-2 flex items-center border-r border-zinc-200 pr-2 dark:border-zinc-800">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save changes</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isAIOpen ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsAIOpen(!isAIOpen)}
            >
              <Sparkles
                className={cn("h-4 w-4", isAIOpen && "text-purple-500")}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Toggle AI Assistant</TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 ml-4">
              Actions
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="gap-2">
              <FileUp className="h-4 w-4" />
              Import PDF/JSON
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <FileDown className="h-4 w-4" />
              Export
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 focus:bg-purple-50 focus:text-purple-600 dark:focus:bg-purple-900/20">
              <Search className="h-4 w-4" />
              ATS Scanner
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
    </TooltipProvider>
  );
}
