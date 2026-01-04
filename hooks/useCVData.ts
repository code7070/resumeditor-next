"use client";

import { useState, useEffect } from "react";
import { CVData, initialCVData } from "@/lib/types";

export function useCVData() {
  const [data, setData] = useState<CVData>(initialCVData);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cv-data-v1");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved CV data:", e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("cv-data-v1", JSON.stringify(data));
  }, [data]);

  const updateHeader = (header: Partial<CVData["header"]>) => {
    setData((prev) => ({
      ...prev,
      header: { ...prev.header, ...header },
    }));
  };

  const updateSummary = (summary: string) => {
    setData((prev) => ({ ...prev, summary }));
  };

  const updateExperience = (experience: CVData["experience"]) => {
    setData((prev) => ({ ...prev, experience }));
  };

  const updateCustomSections = (customSections: CVData["customSections"]) => {
    setData((prev) => ({ ...prev, customSections }));
  };

  const updateSettings = (settings: Partial<CVData["settings"]>) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }));
  };

  const updateData = (newData: Partial<CVData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return {
    data,
    updateHeader,
    updateSummary,
    updateExperience,
    updateCustomSections,
    updateSettings,
    updateData,
  };
}
