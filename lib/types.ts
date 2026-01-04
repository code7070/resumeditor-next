export interface Link {
  text: string;
  url: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  years: string;
  description: string;
  items: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  description: string;
  year: string;
}

export interface CVData {
  header: {
    name: string;
    role: string;
    address: string;
    links: Link[];
    alignment: "left" | "center" | "right";
  };
  summary: string;
  experience: ExperienceItem[];
  customSections: CustomSection[];
  settings: {
    fontFamily: "classic" | "modern";
  };
}

export const initialCVData: CVData = {
  header: {
    name: "John Doe",
    role: "Senior Software Engineer",
    address: "San Francisco, CA",
    links: [
      {
        text: "linkedin.com/in/johndoe",
        url: "https://linkedin.com/in/johndoe",
      },
      { text: "github.com/johndoe", url: "https://github.com/johndoe" },
    ],
    alignment: "center",
  },
  summary:
    "<p>Experienced software engineer with a passion for building scalable web applications. Proficient in React, Next.js, and TypeScript.</p>",
  experience: [
    {
      id: "exp-1",
      title: "Senior Developer",
      company: "Tech Corp",
      years: "2020 - Present",
      description:
        "<p>Led the development of a high-traffic e-commerce platform.</p>",
      items: ["Optimized performance by 40%", "Mentored junior developers"],
    },
  ],
  customSections: [
    {
      id: "custom-1",
      title: "Projects",
      description:
        "<p>Developed an open-source library for data visualization.</p>",
      year: "2022",
    },
  ],
  settings: {
    fontFamily: "modern",
  },
};
