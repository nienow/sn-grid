import React from 'react';
import {EditorData} from "../EditorData";
import {useDialog} from "../providers/DialogProvider";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--sn-stylekit-border-color);
`

const HeaderControl = styled.div`
  border: 1px solid var(--sn-stylekit-border-color);
  border-radius: 3px;
  display: flex;
  align-items: center;
  margin: 3px 5px;

  div {
    padding: 0 10px;
  }

  button:first-child {
    border-right: 1px solid var(--sn-stylekit-border-color);
  }

  button:last-child {
    border-left: 1px solid var(--sn-stylekit-border-color);
  }
`

const ControlButton = styled.button`
  color: var(--sn-stylekit-secondary-foreground-color);
  background-color: var(--sn-stylekit-secondary-background-color);
  border: none;
  outline: none;
  padding: 5px 10px;
  cursor: pointer;
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
      <HeaderControl>
        <ControlButton onClick={checkLastColumn}>-</ControlButton>
        <div>{params.data.columns} column(s)</div>
        <ControlButton onClick={addColumn}>+</ControlButton>
      </HeaderControl>

      <HeaderControl>
        <ControlButton onClick={checkLastRow}>-</ControlButton>
        <div>{params.data.rows} row(s)</div>
        <ControlButton onClick={addRow}>+</ControlButton>
      </HeaderControl>

    </HeaderContainer>
  );
}

export default Header
