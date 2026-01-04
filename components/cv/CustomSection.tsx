"use client";

import { useState } from "react";
import { CustomSection as CustomSectionType } from "@/lib/types";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { Pencil, Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

interface CustomSectionProps {
  items: CustomSectionType[];
  updateSections: (items: CustomSectionType[]) => void;
}

export function CustomSection({ items, updateSections }: CustomSectionProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    updateSections(newItems);
  };

  const addItem = () => {
    const newItem: CustomSectionType = {
      id: `custom-${Date.now()}`,
      title: "New Section",
      description: "<p>Details about this achievement...</p>",
      year: "2024",
    };
    updateSections([...items, newItem]);
    setEditingId(newItem.id);
  };

  const removeItem = (id: string) => {
    updateSections(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<CustomSectionType>) => {
    updateSections(
      items.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-1">
        <h3 className="text-sm font-bold uppercase tracking-wider text-purple-600">
          Additional Sections
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
        <Droppable droppableId="custom-sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-4"
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="group relative flex gap-3"
                    >
                      <div {...provided.dragHandleProps} className="mt-1">
                        <GripVertical className="h-4 w-4 text-zinc-300 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100" />
                      </div>

                      <div className="flex-1">
                        {editingId === item.id ? (
                          <div className="flex flex-col gap-3 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-lg border border-purple-200 dark:border-purple-800/50">
                            <div className="grid grid-cols-[1fr,100px] gap-3">
                              <div className="space-y-1">
                                <Label
                                  htmlFor={`custom-title-${item.id}`}
                                  className="text-[10px] font-bold uppercase text-zinc-400"
                                >
                                  Section Title
                                </Label>
                                <Input
                                  id={`custom-title-${item.id}`}
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
                                  htmlFor={`custom-year-${item.id}`}
                                  className="text-[10px] font-bold uppercase text-zinc-400"
                                >
                                  Year
                                </Label>
                                <Input
                                  id={`custom-year-${item.id}`}
                                  value={item.year}
                                  onChange={(e) =>
                                    updateItem(item.id, {
                                      year: e.target.value,
                                    })
                                  }
                                  className="h-8 text-sm"
                                />
                              </div>
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
                            className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded p-2 transition-colors relative"
                            onClick={() => setEditingId(item.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setEditingId(item.id);
                              }
                            }}
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-zinc-900 dark:text-zinc-50">
                                {item.title}
                              </h4>
                              <span className="text-xs font-semibold text-zinc-400 uppercase">
                                {item.year}
                              </span>
                            </div>
                            <div
                              className="prose prose-sm dark:prose-invert max-w-none mt-1"
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            />
                            <Pencil className="absolute -left-6 top-3 opacity-0 group-hover:opacity-100 h-4 w-4 text-zinc-400" />
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute -right-10 top-2 opacity-0 group-hover:opacity-100 h-8 w-8 text-red-400 hover:text-red-500 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
