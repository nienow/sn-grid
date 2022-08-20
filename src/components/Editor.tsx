import React, {useEffect, useState} from 'react';
import EditorKit from "@standardnotes/editor-kit";
import Header from "./Header";
import Section from "./Section";
import {EditorData} from "../EditorData";
import {DialogProvider} from "../providers/DialogProvider";
import styled from "styled-components";

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const EditorContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`

const EditorRow = styled.div`
  border-bottom: 1px solid var(--sn-stylekit-border-color);
  display: flex;
  flex: 1 0 auto;
`

const EditorSection = styled.div`
  border-right: 1px solid var(--sn-stylekit-border-color);
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`

const Editor = () => {
  const [data, setData] = useState<EditorData>({rows: 2, columns: 2, sections: [[{}, {}], [{}, {}]]});
  const [editorKit, setEditorKit] = useState(null);

  useEffect(() => {
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
      <EditorContainer>
        <Header data={data} saveNote={saveNote}></Header>
        <EditorContent>
          {
            data.sections.map((row, i) => {
              return <EditorRow key={i}>
                {
                  row.map((section, j) => {
                    return <EditorSection key={j}>
                      {
                        <Section section={section} onChange={(e) => handleInputChange(e, i, j)}></Section>
                      }
                    </EditorSection>;
                  })
                }
              </EditorRow>;
            })
          }
        </EditorContent>
      </EditorContainer>
    </DialogProvider>
  );
}

export default Editor
