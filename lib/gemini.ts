"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { CVData } from "./types";

const API_KEY = process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY || "");

export async function parseResumeFromPdf(
  base64Data: string,
  mimeType: string = "application/pdf"
): Promise<Partial<CVData>> {
  if (!API_KEY) throw new Error("Missing GEMINI_API_KEY");

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", // or your preferred model
  });

  const schema = {
    type: "object",
    properties: {
      header: {
        type: "object",
        properties: {
          name: { type: "string" },
          role: { type: "string" },
          address: { type: "string" },
          alignment: { type: "string", enum: ["left", "center", "right"] },
          links: {
            type: "array",
            items: {
              type: "object",
              properties: {
                text: { type: "string" },
                url: { type: "string" },
              },
              required: ["text", "url"],
            },
          },
        },
        required: ["name", "role", "links"],
      },
      summary: { type: "string" },
      experience: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            company: { type: "string" },
            years: { type: "string" },
            description: { type: "string" },
            items: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["title", "company", "years", "description", "items"],
        },
      },
      customSections: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            year: { type: "string" },
          },
          required: ["title", "description", "year"],
        },
      },
    },
    required: ["header", "summary", "experience", "customSections"],
  };

  const prompt = `
    Extract resume data from the file provided.
    Ensure the output strictly adheres to the JSON schema provided.
    
    IMPORTANT for 'header.links':
    - You MUST extract the actual URL/href for every link, not just the visible text.
    - If a text is a hyperlink (e.g. "LinkedIn" or "Portfolio"), extract the underlying URL.
    - For email addresses, include "mailto:" prefix in the url field if not present.
    - For simple text links without hyperlinks, try to reconstruct the URL (e.g. for "github.com/user" -> "https://github.com/user").
    
    For 'experience.items', split the description into bullet points if possible.
    If a field is missing, use an empty string or empty array.
    
    The 'experience' items array should be strings, not objects.
    The 'customSections' should be a flat list of items (title, description, year).
  `;

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data,
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema as any,
      },
    });

    const response = await result.response;
    const text = response.text();
    if (!text) throw new Error("No response from Gemini");

    const parsed = JSON.parse(text);

    // Add IDs to experience and custom sections as they are required by our structure and used for keys/dnd
    if (parsed.experience) {
      parsed.experience = parsed.experience.map((exp: any, index: number) => ({
        ...exp,
        id: `exp-api-${Date.now()}-${index}`,
      }));
    }

    if (parsed.customSections) {
      parsed.customSections = parsed.customSections.map(
        (sec: any, index: number) => ({
          ...sec,
          id: `custom-api-${Date.now()}-${index}`,
        })
      );
    }

    return parsed;
  } catch (e) {
    console.error("Gemini Parse Error:", e);
    throw e;
  }
}
