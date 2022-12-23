import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <GlobalContext.Provider
      value={{ showNav, setShowNav }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
