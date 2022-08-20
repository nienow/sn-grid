import React from 'react';
import {EditorData} from "../EditorData";
import {useDialog} from "../providers/DialogProvider";
import styled from "styled-components";
import NumberControl from "./NumberControl";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
`

interface Params {
  data: EditorData;
  saveNote: () => void;
}

const Header = (params: Params) => {
  const {confirm, alert} = useDialog();

  const addColumn = () => {
    params.data.columns++;
    params.data.sections.forEach(row => {
      row.push({});
    });
    params.saveNote();
  };

  const checkLastColumn = () => {
    if (params.data.columns > 1) {
      const hasContent = !!params.data.sections.find(row => {
        return !!row[row.length - 1].text;
      });
      if (hasContent) {
        confirm('Removing a column will delete content? Are you sure?', () => {
          removeColumn();
        })
      } else {
        removeColumn();
      }
    } else {
      alert('Cannot delete the only column');
    }
  };

  const removeColumn = () => {
    params.data.columns--;
    params.data.sections.forEach(row => {
      row.pop();
    });
    params.saveNote();
  };

  const addRow = () => {
    params.data.rows++;
    const newRow = [];
    for (let i = 0; i < params.data.columns; i++) {
      newRow.push({});
    }
    params.data.sections.push(newRow);
    params.saveNote();
  };

  const checkLastRow = () => {
    if (params.data.rows > 1) {
      const lastRow = params.data.sections[params.data.sections.length - 1];
      const hasContent = !!lastRow.find(column => !!column.text);
      if (hasContent) {
        confirm('Removing a row will delete content? Are you sure?', () => {
          removeRow();
        })
      } else {
        removeRow();
      }
    } else {
      alert('Cannot delete the only row');
    }
  };

  const removeRow = () => {
    params.data.rows--;
    params.data.sections.pop();
    params.saveNote();
  };

  return (
    <HeaderContainer>
      <NumberControl increase={addColumn} decrease={checkLastColumn} display={params.data.columns + ' columns(s)'}></NumberControl>
      <NumberControl increase={addRow} decrease={checkLastRow} display={params.data.rows + ' row(s)'}></NumberControl>
    </HeaderContainer>
  );
}

export default Header
