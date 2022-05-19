import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const ContextProvider = props => {
    const [appContext, setAppContext] = useState({
      products: [],
      cart: [],
    });
  
    return (
      <AppContext.Provider value={[appContext, setAppContext]}>
        {props.children}
      </AppContext.Provider>
    );
};