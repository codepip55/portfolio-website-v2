export interface LanguageData {
  name: string;
  slug: string;
  description: string;
  projects: {
    id: number,
    title: string,
    link: string
  }[];
  type: string;
};
