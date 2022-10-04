import {DataVersion, EditorData, NienowGrid, NienowSticky} from './EditorData';

export const newEditorData = (text): EditorData => {
  return {
    editor: NienowGrid,
    version: DataVersion,
    rows: 2,
    columns: 2,
    sections: [[{text: text || ''}, {}], [{}, {}]]
  };
};

export const transformEditorData = (text: string): EditorData => {
  if (text) {
    if (text.indexOf('{') === 0) {
      try {
        const parsedData = JSON.parse(text);
        if (parsedData.editor === NienowGrid && parsedData.version === 1) {
          return parsedData;
        } else if (parsedData.editor === NienowSticky && parsedData.version === 1) {
          return transformFromSticky(parsedData);
        }
      } catch (e) {
        console.error(e);
      }
      return null;
    }
  } else {
    return newEditorData(text);
  }
};

export const transformFromSticky = (data: any): EditorData => {
  const newData: EditorData = {
    editor: NienowGrid,
    version: 1,
    rows: 0,
    columns: 0,
    sections: []
  };

  const sections = Object.values(data.sections);
  sections.sort((s1: any, s2: any) => s1.index - s2.index);
  if (sections.length === 0) {
    return newEditorData(null);
  } else if (sections.length === 1) {
    newData.columns = 1;
  } else {
    newData.columns = 2;
  }
  newData.rows = Math.ceil(sections.length / newData.columns);

  for (let row = 0; row < newData.rows; row++) {
    const rowArray = [];
    for (let col = 0; col < newData.columns; col++) {
      const indexToFind = row * newData.columns + col;
      const section: any = sections.find((s: any) => s.index === indexToFind);
      if (section) {
        rowArray.push({
          title: section.title,
          text: section.text
        });
      } else {
        rowArray.push({});
      }
    }
    newData.sections[row] = rowArray;
  }

  return newData;
};
