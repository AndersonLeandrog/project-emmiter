import React, { createContext, useState } from 'react';

export const ProviderContext = createContext({});

const Provider = ({children}) => {
   return (
      <ProviderContext.Provider value={{screen: 'Emmiter'}}>
         {children}
      </ProviderContext.Provider>
   )
};

export default Provider;