import React, {useState} from 'react';
import {SectionData} from "../EditorData";
import styled from "styled-components";

const SectionTitle = styled.input`
  border: none;
  background-color: var(--sn-stylekit-secondary-background-color);
  outline: none;
  color: var(--sn-stylekit-foreground-color);
  line-height: 1.4;
  padding: 10px;
`;

const SectionTextArea = styled.textarea`
  flex: 1 1 auto;
  background-color: inherit;
  border: none;
  outline: none;
  padding: 10px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  line-height: 1.4;
  resize: none;
  color: var(--sn-stylekit-foreground-color);
`;

interface Params {
  section: SectionData;
  saveNote: () => void;
}

const Section = (params: Params) => {
  const [text, setText] = useState(params.section.text || '');
  const [title, setTitle] = useState(params.section.title || '');

  const onTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    params.section.title = value;
    params.saveNote();
  };

  const onTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    params.section.text = value;
    params.saveNote();
  };

  return (
    <>
      <SectionTitle type="text" name="title" value={title} onChange={onTitleChange}/>
      <SectionTextArea tabIndex={1} name="value" value={text} onChange={onTextChange}/>
    </>
  );
};

export default Section
