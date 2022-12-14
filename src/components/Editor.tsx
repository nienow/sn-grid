import React, {useEffect, useState} from 'react';
import EditorKit from "@standardnotes/editor-kit";
import Header from "./Header";
import Section from "./Section";
import {EditorData} from "../EditorData";
import {DialogProvider} from "../providers/DialogProvider";
import styled from "styled-components";
import Unsupported from "./Unsupported";
import {newEditorData, transformEditorData} from "../transformations";

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
  const [data, setData] = useState<EditorData>(null);
  const [unsupported, setUnsupported] = useState(false);
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

    // Uncomment to use test data
    // initializeText(TestData);
  }, []);

  const initializeText = (text) => {
    const data = transformEditorData(text);
    if (data) {
      setData(data);
    } else {
      setUnsupported(true);
    }
  };

  const eraseDataAndStartNewNote = () => {
    setUnsupported(false);
    setData(newEditorData(''));
    saveNote();
  };

  const saveNote = () => {
    const text = JSON.stringify(data);
    try {
      editorKit?.onEditorValueChanged(text);
    } catch (error) {
      console.log('Error saving note:', error);
    }
  };

  const saveNoteAndRefresh = () => {
    setData({...data});
    saveNote();
  };

  if (data) {
    return (
      <DialogProvider>
        <EditorContainer>
          <Header data={data} saveNote={saveNoteAndRefresh}></Header>
          <EditorContent>
            {
              data.sections.map((row, i) => {
                return <EditorRow key={i}>
                  {
                    row.map((section, j) => {
                      return <EditorSection key={j}>
                        {
                          <Section section={section} saveNote={saveNote}></Section>
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
  } else if (unsupported) {
    return (
      <Unsupported eraseFn={eraseDataAndStartNewNote}></Unsupported>
    )
  }
}

export default Editor
