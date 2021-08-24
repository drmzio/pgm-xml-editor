import React, { useState } from 'react';
import { GlobalContext } from '../context';

export default function GlobalContextProvider({ children }) {
  const [reference, setReference] = useState(null);

  return (
    <GlobalContext.Provider value={{ reference, setReference }}>
      {children}
    </GlobalContext.Provider>
  )
}
