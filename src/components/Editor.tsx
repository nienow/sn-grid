import React, {useEffect, useState} from 'react';
import EditorKit from "@standardnotes/editor-kit";
import Header from "./Header";
import Section from "./Section";
import {EditorData} from "../EditorData";
import {DialogProvider} from "../providers/DialogProvider";

const Editor = () => {
  const [data, setData] = useState<EditorData>({rows: 2, columns: 2, sections: [[{}, {}], [{}, {}]]});
  const [editorKit, setEditorKit] = useState(null);

  //console.log('run editor');

  useEffect(() => {
    //console.log('useeffect');
    setEditorKit(new EditorKit({
      setEditorRawText: initializeText,
      clearUndoHistory: () => {
      },
      getElementsBySelector: () => []
    }, {
      mode: 'plaintext',
      supportsFileSafe: false
    }));

  }, []);

  const initializeText = (text) => {
    let parsedData;
    if (text) {
      if (text.indexOf('{') === 0) {
        try {
          parsedData = JSON.parse(text);
        } catch {
        }
      }
    }
    if (!parsedData) {
      parsedData = {rows: 2, columns: 2, sections: [[{text: text || ''}, {}], [{}, {}]]};
    }
    setData(parsedData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>, row, column) => {
    const target = event.target;
    const value = target.value;
    if (target.name === "title") {
      data.sections[row][column].title = value;
    } else {
      data.sections[row][column].text = value;
    }
    saveNote();
  };

  const saveNote = () => {
    setData({...data});
    const text = JSON.stringify(data);
    try {
      editorKit?.onEditorValueChanged(text);
    } catch (error) {
      console.log('Error saving note:', error);
    }
  };

  return (
    <DialogProvider>
      <div className="nienow-editor">
        <Header data={data} saveNote={saveNote}></Header>
        <div className="nienow-editor__content">
          {
            data.sections.map((row, i) => {
              return <div className="nienow-editor__row" key={i}>
                {
                  row.map((section, j) => {
                    return <div className="nienow-editor__column" key={j}>
                      {
                        <Section section={section} onChange={(e) => handleInputChange(e, i, j)}></Section>
                      }
                    </div>;
                  })
                }
              </div>;
            })
          }
        </div>
      </div>
    </DialogProvider>
  );
}

export default Editor
