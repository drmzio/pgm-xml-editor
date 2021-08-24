import React from 'react';

export interface GlobalContextState {
  reference: string;
  setReference: (ref: string) => void;
}

export const GlobalContext = React.createContext<GlobalContextState>(undefined);
