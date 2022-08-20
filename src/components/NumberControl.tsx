import React from 'react';
import styled from "styled-components";

const ControlContainer = styled.div`
  border: 1px solid var(--sn-stylekit-border-color);
  border-radius: 3px;
  display: flex;
  align-items: center;
  margin: 3px 5px;
`

const ControlLabel = styled.div`
  padding: 0 10px;
`

const ControlButton = styled.button`
  color: var(--sn-stylekit-secondary-foreground-color);
  background-color: var(--sn-stylekit-secondary-background-color);
  border: none;
  outline: none;
  padding: 5px 10px;
  cursor: pointer;

  &:first-child {
    border-right: 1px solid var(--sn-stylekit-border-color);
  }

  &:last-child {
    border-left: 1px solid var(--sn-stylekit-border-color);
  }
`

interface Params {
  increase: () => void;
  decrease: () => void;
  display: string;
}

const NumberControl = (params: Params) => {
  return (
    <ControlContainer>
      <ControlButton onClick={params.decrease}>-</ControlButton>
      <ControlLabel>{params.display}</ControlLabel>
      <ControlButton onClick={params.increase}>+</ControlButton>
    </ControlContainer>
  );
}

export default NumberControl
