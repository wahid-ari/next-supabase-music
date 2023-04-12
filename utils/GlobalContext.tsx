import { createContext, ReactNode, useState } from 'react';

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [showNav, setShowNav] = useState(false);

  return <GlobalContext.Provider value={{ showNav, setShowNav }}>{children}</GlobalContext.Provider>;
};
