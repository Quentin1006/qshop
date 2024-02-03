import { Basket } from 'qshop-sdk';
import { createContext, useContext, useState } from 'react';

export type IAppContext = {
  basket: Basket;
  setBasket: (basket: Basket) => void;
};

const AppContext = createContext<IAppContext | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export type AppProviderProps = {
  initialBasket: Basket;
};

export const AppProvider = ({ children, initialBasket }: { children: JSX.Element } & AppProviderProps) => {
  console.log({ initialBasket });
  const [basket, setBasket] = useState(initialBasket);

  return <AppContext.Provider value={{ basket, setBasket }}>{children}</AppContext.Provider>;
};
