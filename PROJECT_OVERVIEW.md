# CV Builder - Project Overview

## 📋 Project Description

**CV Builder** is a premium, modern web application designed for creating and managing high-quality professional resumes. It features a real-time interactive editor balanced with advanced AI-powered tools for content refinement, ATS (Applicant Tracking System) analysis, and automated PDF importing.

## 🎯 Main Objectives

- **Visual Excellence**: Professional CV layouts with real-time feedback.
- **AI-Driven Success**: Leverage Gemini AI to optimize resume content and score.
- **ATS Optimization**: Provide deep insights and visual feedback on how resumes perform against ATS standards.
- **Seamless Data Flow**: Easy import from PDF and export to multiple professional formats.

## 🛠️ Tech Stack

### Frontend & Framework

- **Next.js 16.1.1**: The React Framework for the Web, utilizing the App Router for modern routing and layouts.
- **React 19.2.3**: The latest React version for building a responsive and efficient UI.
- **TypeScript**: Ensuring robust type safety across the codebase.
- **Tailwind CSS 4**: Modern styling with utility-first classes and built-in animations.

### AI & Signal Processing

- **Google Generative AI (Gemini 2.5 Flash)**: Powering multimodal resume parsing, text refinement, and deep ATS analysis.
- **Slate.js**: A highly customizable framework for building rich text editors, used for professional summary and experience descriptions.
- **PDF.js**: Specialized in high-fidelity PDF parsing and text extraction.

### Data Visualization & UX

- **p5.js 2.1.2**: Used for "Generative Analysis Art" to visualize CV resonance and data density.
- **Recharts**: Provides clean, interactive charts for ATS score distribution and analytics.
- **shadcn/ui**: Built on Radix UI and Lucide React for premium, accessible UI components.
- **@hello-pangea/dnd**: Enabling intuitive drag-and-drop for section and item reordering.

### Infrastructure & Operations

- **Vercel / Cloudflare Pages**: High-performance hosting with professional deployment workflows.
- **Bun**: Fast JavaScript runtime and package manager.
- **Local Storage**: Automatic data persistence for a seamless "edit-and-return" experience.

---

## ✨ Main Features

### 1. **Premium Interactive Editor**

- **Split View Interface**: Simultaneous editing and high-fidelity preview.
- **Modern Sidebar Management**: Centralized control for all CV sections using a persistent `AppSidebar`.
- **Theme Support**: Seamless Dark/Light mode transitions with persistent preferences.
- **Dynamic Formatting**: Switch between ATS-friendly fonts (Serif, Sans, Mono) instantly.
- **Save & Undo History**: Robust undo/redo capabilities with manual save points and "Last saved" tracking for maximum data security.

### 2. **Advanced Rich Text Editing**

- **Slate.js Integration**: Full control over formatting with a minimalist WYSIWYG experience.
- **Bullet Point Management**: Specialized controls for achievement-oriented bullet points.
- **AI Refinement**: Contextualize and professionalize summaries with one-click AI assistance.

### 3. **AI-Powered PDF Import (Resume Scan)**

- **Multimodal Extraction**: Uses Gemini Vision and PDF.js to accurately map PDF content to structured data.
- **Smart Mapping**: Automatically detects Work Experience, Education, and Skills from legacy resumes.
- **Consent-First Design**: Secure and transparent AI processing with user consent dialogs.

### 4. **Deep ATS Analysis Dashboard**

- **Generative Signal Art**: Real-time p5.js visualization of "Narrative Signal" and "Spectral Density."
- **Score Analytics**: Recharts-powered breakdown of CV performance scores.
- **Actionable Feedback**: Specific suggestions for strengths, improvements, and missing keywords.
- **History Tracking**: Compare scores across multiple iterations to measure improvement.

### 5. **Flexible Section Architecture**

- **Core Sections**: Dedicated modules for Header (Contacts/Links), Summary, and Experience.
- **Custom Section Builder**: Create unlimited customized modules (Skills, Certifications, Projects, etc.).
- **Dialog-Based Editing**: Focused editing experience for complex sections via `SectionEditor`.

### 6. **Professional Export Engine**

- **Native Print-to-PDF**: Optimized CSS ensures pixel-perfect PDF export via browser print dialog.
- **Multi-Format Export**:
  - **JSON**: Portable data backups.
  - **Markdown**: For developers and documentation-style resumes.
  - **LaTeX**: High-quality academic and technical formatting.

---

## 📁 Project Structure

```
cv-builder-next/
├── app/                    # App Router directory
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # UI Components (Proposed)
│   ├── editor/
│   ├── ui/
│   └── ...
├── lib/                    # Utility functions and shared logic (Proposed)
│   ├── utils.ts
│   └── ...
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── bun.lockb               # Lockfile
```

---

## 🚀 Setup & Development

### Local Setup

1. Clone the repository and install dependencies:

   ```bash
   bun install
   ```

2. Configure `.env` with `NEXT_PUBLIC_GEMINI_API_KEY` (or appropriate env vars).

3. Start the development server:
   ```bash
   bun dev
   ```

### Deployment

The project is optimized for modern edge deployment platforms like **Vercel** or **Cloudflare Pages**.

- Build: `bun run build`
- Start: `bun start`

---

**Last Updated**: January 2026
**Version**: 0.1.0
