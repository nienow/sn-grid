export interface EditorData {
  editor: string;
  version: number;
  rows: number;
  columns: number;
  sections: SectionData[][];
}

export const NienowGrid = 'nienow.grid';
export const DataVersion = 1;

export interface SectionData {
  title?: string;
  text?: string;
}

export const newEditorData = (text): EditorData => {
  return {
    editor: NienowGrid,
    version: DataVersion,
    rows: 2,
    columns: 2,
    sections: [[{text: text || ''}, {}], [{}, {}]]
  };
};

export const transformEditorData = (data: any, originalText: string): EditorData => {
  if (data && data.editor === NienowGrid && data.version === 1) {
    return data;
  } else if (data && data.rows && data.columns) {
    data.editor = NienowGrid;
    data.version = DataVersion;
    return data;
  } else {
    return newEditorData(originalText);
  }
};
