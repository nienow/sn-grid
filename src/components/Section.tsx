import React from 'react';
import {SectionData} from "../EditorData";

interface Params {
  section: SectionData;
  onChange: (e) => void;
}

const Section = (params: Params) => {
  return (
    <div className="nienow-editor__box">
      <input type="text" name="title" value={params.section.title || ''} onChange={params.onChange}/>
      <textarea tabIndex={1} name="value" value={params.section.text || ''} onChange={params.onChange}/>
    </div>
  );
}

export default Section
