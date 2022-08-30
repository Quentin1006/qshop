import { createContext, useContext, useState } from 'react';

const AppContext = createContext<any>({});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }: any) => {
  // no app state yet
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
