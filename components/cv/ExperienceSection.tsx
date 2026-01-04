"use client";

import { useState } from "react";
import { ExperienceItem } from "@/lib/types";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { Pencil, Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

interface ExperienceSectionProps {
  items: ExperienceItem[];
  updateExperience: (items: ExperienceItem[]) => void;
}

export function ExperienceSection({
  items,
  updateExperience,
}: ExperienceSectionProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    updateExperience(newItems);
  };

  const addItem = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      title: "New Role",
      company: "Company Name",
      years: "2024 - Present",
      description: "<p>Describe your achievements...</p>",
      items: ["Key achievement..."],
    };
    updateExperience([...items, newItem]);
    setEditingId(newItem.id);
  };

  const removeItem = (id: string) => {
    updateExperience(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<ExperienceItem>) => {
    updateExperience(
      items.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex items-center justify-between border-b-2 border-purple-600 pb-1">
        <h3 className="text-cv-lg font-bold uppercase tracking-wide text-purple-600">
          Professional Experience
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-zinc-400 hover:text-purple-600"
          onClick={addItem}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="experience">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-6"
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="group relative flex gap-3 -ml-8"
                    >
                      <div {...provided.dragHandleProps} className="mt-1">
                        <GripVertical className="h-4 w-4 text-zinc-300 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100" />
                      </div>

                      <div className="flex-1 flex flex-col gap-1">
                        {editingId === item.id ? (
                          <div className="flex flex-col gap-3 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-lg border border-purple-200 dark:border-purple-800/50">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <Label
                                  htmlFor={`title-${item.id}`}
                                  className="text-[10px] font-bold uppercase text-zinc-400"
                                >
                                  Position
                                </Label>
                                <Input
                                  id={`title-${item.id}`}
                                  value={item.title}
                                  onChange={(e) =>
                                    updateItem(item.id, {
                                      title: e.target.value,
                                    })
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label
                                  htmlFor={`company-${item.id}`}
                                  className="text-[10px] font-bold uppercase text-zinc-400"
                                >
                                  Company
                                </Label>
                                <Input
                                  id={`company-${item.id}`}
                                  value={item.company}
                                  onChange={(e) =>
                                    updateItem(item.id, {
                                      company: e.target.value,
                                    })
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label
                                htmlFor={`years-${item.id}`}
                                className="text-[10px] font-bold uppercase text-zinc-400"
                              >
                                Timeline
                              </Label>
                              <Input
                                id={`years-${item.id}`}
                                value={item.years}
                                onChange={(e) =>
                                  updateItem(item.id, { years: e.target.value })
                                }
                                className="h-8 text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-[10px] font-bold uppercase text-zinc-400">
                                Description
                              </Label>
                              <RichTextEditor
                                value={item.description}
                                onChange={(val) =>
                                  updateItem(item.id, { description: val })
                                }
                                className="bg-white dark:bg-zinc-950"
                              />
                            </div>
                            <Button
                              size="sm"
                              onClick={() => setEditingId(null)}
                              className="w-fit self-end"
                            >
                              Done
                            </Button>
                          </div>
                        ) : (
                          <div
                            role="button"
                            tabIndex={0}
                            className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded p-4 -mx-4 transition-colors relative pr-12"
                            onClick={() => setEditingId(item.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setEditingId(item.id);
                              }
                            }}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex gap-2 text-cv-md items-center">
                                <h4 className="font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
                                  {item.title}
                                </h4>
                                <div className="font-medium text-zinc-600 dark:text-zinc-400">
                                  {item.company}
                                </div>
                              </div>
                              <div className="text-cv-sm font-semibold text-zinc-400 uppercase">
                                {item.years}
                              </div>
                            </div>
                            <div
                              className="prose prose-base text-cv-md dark:prose-invert max-w-none [&>ul]:list-disc [&>ul]:list-inside"
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            />

                            {/* Action Buttons Grouped on the Right */}
                            <div className="absolute right-2 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-zinc-400 hover:text-purple-600 hover:bg-purple-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingId(item.id);
                                }}
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </Button>
                              <ConfirmDeleteDialog
                                onConfirm={() => removeItem(item.id)}
                                title="Delete experience?"
                                description={`Are you sure you want to delete your role at "${item.company}"?`}
                              >
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-zinc-400 hover:text-red-500 hover:bg-red-50"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </ConfirmDeleteDialog>
                            </div>
                          </div>
                        )}
                      </div>
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
  );
}
