"use client";

import { useState } from "react";
import { CVData, Link } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MapPin, Pencil, Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

interface HeaderSectionProps {
  data: CVData["header"];
  updateHeader: (header: Partial<CVData["header"]>) => void;
}

export function HeaderSection({ data, updateHeader }: HeaderSectionProps) {
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleLinkUpdate = (
    index: number,
    field: keyof Link,
    value: string
  ) => {
    const newLinks = [...data.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    updateHeader({ links: newLinks });
  };

  const addLink = () => {
    updateHeader({ links: [...data.links, { text: "New Link", url: "" }] });
  };

  const removeLink = (index: number) => {
    updateHeader({ links: data.links.filter((_, i) => i !== index) });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(data.links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateHeader({ links: items });
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        data.alignment === "center"
          ? "items-center text-center"
          : "items-start text-left"
      )}
    >
      {/* Name */}
      <div className="group relative w-full">
        {editingField === "name" ? (
          <Input
            value={data.name}
            onChange={(e) => updateHeader({ name: e.target.value })}
            onBlur={() => setEditingField(null)}
            autoFocus
            className="text-3xl font-bold text-center h-auto py-1 px-2 border-none focus-visible:ring-1 focus-visible:ring-purple-500"
          />
        ) : (
          <h1
            role="button"
            tabIndex={0}
            className="text-3xl font-bold cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded px-2"
            onClick={() => setEditingField("name")}
            onKeyDown={(e) => e.key === "Enter" && setEditingField("name")}
          >
            {data.name || "Your Name"}
            <Pencil className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 h-4 w-4 text-zinc-400" />
          </h1>
        )}
      </div>

      {/* Role */}
      <div className="group relative w-full">
        {editingField === "role" ? (
          <Input
            value={data.role}
            onChange={(e) => updateHeader({ role: e.target.value })}
            onBlur={() => setEditingField(null)}
            autoFocus
            className="text-xl text-zinc-600 dark:text-zinc-400 text-center border-none focus-visible:ring-1 focus-visible:ring-purple-500"
          />
        ) : (
          <h2
            role="button"
            tabIndex={0}
            className="text-xl text-zinc-600 dark:text-zinc-400 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded px-2"
            onClick={() => setEditingField("role")}
            onKeyDown={(e) => e.key === "Enter" && setEditingField("role")}
          >
            {data.role || "Professional Title"}
            <Pencil className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 h-4 w-4 text-zinc-400" />
          </h2>
        )}
      </div>

      {/* Address */}
      <div className="group relative flex items-center gap-2 mt-1">
        <MapPin className="h-3 w-3 text-zinc-400" />
        {editingField === "address" ? (
          <Input
            value={data.address}
            onChange={(e) => updateHeader({ address: e.target.value })}
            onBlur={() => setEditingField(null)}
            autoFocus
            className="text-xs border-none h-auto py-0.5 px-1 focus-visible:ring-1 focus-visible:ring-purple-500"
          />
        ) : (
          <span
            role="button"
            tabIndex={0}
            className="text-xs text-zinc-500 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded px-1"
            onClick={() => setEditingField("address")}
            onKeyDown={(e) => e.key === "Enter" && setEditingField("address")}
          >
            {data.address || "Location"}
          </span>
        )}
      </div>

      {/* Links */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="links" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-2"
            >
              {data.links.map((link, index) => (
                <Draggable
                  key={`link-${index}`}
                  draggableId={`link-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="group relative flex items-center gap-1 text-xs text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50 px-2 py-0.5 rounded border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
                    >
                      <div {...provided.dragHandleProps}>
                        <GripVertical className="h-3 w-3 text-zinc-300 group-hover:text-zinc-400" />
                      </div>
                      {editingField === `link-${index}` ? (
                        <div className="flex gap-1 items-center">
                          <Input
                            value={link.text}
                            onChange={(e) =>
                              handleLinkUpdate(index, "text", e.target.value)
                            }
                            className="h-6 w-24 text-[10px] p-1"
                            placeholder="Text"
                          />
                          <Input
                            value={link.url}
                            onChange={(e) =>
                              handleLinkUpdate(index, "url", e.target.value)
                            }
                            className="h-6 w-32 text-[10px] p-1"
                            placeholder="URL"
                            onBlur={() => setEditingField(null)}
                            autoFocus
                          />
                        </div>
                      ) : (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-purple-600 transition-colors"
                          onClick={(e) => {
                            if (e.metaKey || e.ctrlKey) return;
                            e.preventDefault();
                            setEditingField(`link-${index}`);
                          }}
                        >
                          {link.text}
                        </a>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100"
                        onClick={() => removeLink(index)}
                      >
                        <Trash2 className="h-3 w-3 text-red-400" />
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400"
                onClick={addLink}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
