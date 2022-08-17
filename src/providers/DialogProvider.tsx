import React, {createContext, useContext, useState} from 'react';
import styled from "styled-components";
import {createPortal} from "react-dom";

const DialogBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`

const DialogContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  max-width: 300px;
  background-color: #ccc;
  padding: 50px;
`

const SimpleDialog = ({children, open}) => {
  if (open) {
    return createPortal(
      <DialogBackground>
        <DialogContainer>
          {children}
        </DialogContainer>
      </DialogBackground>,
      document.body
    );
  }
}

interface IDialogContext {
  confirm: (text: string, action: () => void) => void;
  alert: (text: string) => void;
}

const DialogContext = createContext<IDialogContext>({
  confirm: null,
  alert: null
});

export const useDialog = () => useContext(DialogContext);

export const DialogProvider = ({children}) => {
  const [contents, setContents] = useState(null);

  const confirm = (text, action) => {
    const confirmContents = (
      <>
        <div>{text}</div>
        <div>
          <button onClick={() => {
            action();
            closeDialog()
          }}>OK
          </button>
          <button onClick={closeDialog}>Cancel</button>
        </div>
      </>
    )

    setContents(confirmContents);
  };

  const alert = (text) => {
    const confirmContents = (
      <>
        <div>{text}</div>
        <div>
          <button onClick={closeDialog}>OK
          </button>
        </div>
      </>
    )

    setContents(confirmContents);
  };

  const closeDialog = () => {
    setContents(null);
  }

  return (
    <DialogContext.Provider value={{confirm, alert}}>
      <SimpleDialog open={!!contents}>{contents}</SimpleDialog>
      {children}
    </DialogContext.Provider>
  );
};
