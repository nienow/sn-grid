export interface EditorData {
  rows: number;
  columns: number;
  sections: SectionData[][];
}

export interface SectionData {
  title?: string;
  text?: string;
}
