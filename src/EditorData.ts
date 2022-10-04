export interface EditorData {
  editor: string;
  version: number;
  rows: number;
  columns: number;
  sections: SectionData[][];
}

export const NienowGrid = 'nienow.grid';
export const NienowSticky = 'nienow.sticky';
export const DataVersion = 1;

export interface SectionData {
  title?: string;
  text?: string;
}
