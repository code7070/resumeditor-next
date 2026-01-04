"use client";

import { useState, useEffect } from "react";
import { CVData, Link as LinkType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import {
  Pencil,
  Plus,
  Trash2,
  GripVertical,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface HeaderSectionProps {
  data: CVData["header"];
  updateHeader: (header: Partial<CVData["header"]>) => void;
}

export function HeaderSection({ data, updateHeader }: HeaderSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localData, setLocalData] = useState(data);

  // Sync local state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setLocalData(data);
    }
  }, [isOpen, data]);

  const handleLinkUpdate = (
    index: number,
    field: keyof LinkType,
    value: string
  ) => {
    const newLinks = [...localData.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLocalData({ ...localData, links: newLinks });
  };

  const addLink = () => {
    setLocalData({
      ...localData,
      links: [...localData.links, { text: "New Link", url: "" }],
    });
  };

  const removeLink = (index: number) => {
    setLocalData({
      ...localData,
      links: localData.links.filter((_, i) => i !== index),
    });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(localData.links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setLocalData({ ...localData, links: items });
  };

  const handleSave = () => {
    updateHeader(localData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className="group/header relative cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/50 rounded-lg p-4 -mx-4 transition-all"
          role="button"
          tabIndex={0}
        >
          <div
            className={cn(
              "flex flex-col gap-1",
              data.alignment === "center" && "items-center text-center",
              data.alignment === "left" && "items-start text-left",
              data.alignment === "right" && "items-end text-right"
            )}
          >
            <h1 className="text-cv-xl font-bold text-zinc-900 dark:text-zinc-50 leading-none">
              {data.name || "Your Name"}
            </h1>
            {data.role && (
              <h2 className="text-cv-lg font-medium text-zinc-600 dark:text-zinc-400 mt-1">
                {data.role}
              </h2>
            )}

            <div
              className={cn(
                "flex flex-wrap items-center gap-x-2 gap-y-1 text-cv-md text-zinc-500 mt-1",
                data.alignment === "center" && "justify-center",
                data.alignment === "right" && "justify-end"
              )}
            >
              {data.address && <span>{data.address}</span>}
              {data.address && data.links.length > 0 && (
                <div className="w-px h-3 bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
              )}
              {data.links.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-cv-md">
                  {data.links.map((link, i) =>
                    link.url ? (
                      <Link
                        key={i}
                        href={link.url}
                        className="underline hover:text-purple-600 transition-colors text-cv-md"
                        target="_blank"
                      >
                        {link.text}
                      </Link>
                    ) : (
                      <span
                        key={i}
                        className="hover:text-purple-600 transition-colors"
                      >
                        {link.text}
                      </span>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="absolute top-4 -right-2 opacity-0 group-hover/header:opacity-100 transition-opacity bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-full p-2 shadow-sm print:hidden">
            <Pencil className="h-4 w-4 text-purple-600" />
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Header Information</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Alignment */}
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Layout Alignment
            </Label>
            <div className="flex gap-2">
              <Button
                variant={localData.alignment === "left" ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() =>
                  setLocalData({ ...localData, alignment: "left" })
                }
              >
                <AlignLeft className="h-4 w-4 mr-2" />
                Left
              </Button>
              <Button
                variant={
                  localData.alignment === "center" ? "default" : "outline"
                }
                size="sm"
                className="flex-1"
                onClick={() =>
                  setLocalData({ ...localData, alignment: "center" })
                }
              >
                <AlignCenter className="h-4 w-4 mr-2" />
                Center
              </Button>
              <Button
                variant={
                  localData.alignment === "right" ? "default" : "outline"
                }
                size="sm"
                className="flex-1"
                onClick={() =>
                  setLocalData({ ...localData, alignment: "right" })
                }
              >
                <AlignRight className="h-4 w-4 mr-2" />
                Right
              </Button>
            </div>
          </div>

          <Separator />

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="header-name">Full Name</Label>
              <Input
                id="header-name"
                value={localData.name}
                onChange={(e) =>
                  setLocalData({ ...localData, name: e.target.value })
                }
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="header-role">Professional Title</Label>
              <Input
                id="header-role"
                value={localData.role}
                onChange={(e) =>
                  setLocalData({ ...localData, role: e.target.value })
                }
                placeholder="e.g. Senior Software Engineer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="header-address">Location / Address</Label>
            <Input
              id="header-address"
              value={localData.address}
              onChange={(e) =>
                setLocalData({ ...localData, address: e.target.value })
              }
              placeholder="e.g. New York, USA"
            />
          </div>

          <Separator />

          {/* Links Management */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Contact & Social Links
              </Label>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={addLink}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Link
              </Button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="header-links">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {localData.links.map((link, index) => (
                      <Draggable
                        key={`link-${index}`}
                        draggableId={`link-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-900 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800"
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="cursor-grab"
                            >
                              <GripVertical className="h-4 w-4 text-zinc-400" />
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-2">
                              <Input
                                value={link.text}
                                onChange={(e) =>
                                  handleLinkUpdate(
                                    index,
                                    "text",
                                    e.target.value
                                  )
                                }
                                placeholder="Label (e.g. LinkedIn)"
                                className="h-8 text-xs"
                              />
                              <Input
                                value={link.url}
                                onChange={(e) =>
                                  handleLinkUpdate(index, "url", e.target.value)
                                }
                                placeholder="URL"
                                className="h-8 text-xs"
                              />
                            </div>
                            <ConfirmDeleteDialog
                              onConfirm={() => removeLink(index)}
                              title="Delete link?"
                              description="Are you sure you want to remove this link?"
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-400 hover:text-red-500 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </ConfirmDeleteDialog>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
