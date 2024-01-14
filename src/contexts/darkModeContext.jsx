import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [darkModeOn, setDarkModeOn] = useState(false);

  useEffect(() => {
    if (darkModeOn) {
      document.documentElement.classList.remove("light-mode");
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  }, [darkModeOn]);

  function toggleDarkMode() {
    setDarkModeOn((darkModeOn) => !darkModeOn);
  }
  return (
    <DarkModeContext.Provider value={{ darkModeOn, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("The dark mode provider has used outside of its scope.");
  }
  return context;
}

export default DarkModeProvider;
