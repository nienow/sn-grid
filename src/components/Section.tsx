import React from 'react';
import {SectionData} from "../EditorData";
import styled from "styled-components";

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  textarea {
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
  }

  input {
    border: none;
    background-color: var(--sn-stylekit-secondary-background-color);
    outline: none;
    color: var(--sn-stylekit-foreground-color);
    line-height: 1.4;
    padding: 10px;
  }
`

interface Params {
  section: SectionData;
  onChange: (e) => void;
}

const Section = (params: Params) => {
  return (
    <SectionContainer>
      <input type="text" name="title" value={params.section.title || ''} onChange={params.onChange}/>
      <textarea tabIndex={1} name="value" value={params.section.text || ''} onChange={params.onChange}/>
    </SectionContainer>
  );
}

export default Section
