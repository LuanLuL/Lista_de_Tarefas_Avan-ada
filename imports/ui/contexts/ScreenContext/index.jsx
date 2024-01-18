import React, { createContext, useState, useEffect } from "react";

export const ScreenContext = createContext({});

export function ScreenContextProvider(props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ScreenContext.Provider value={{ windowWidth }}>
      {props.children}
    </ScreenContext.Provider>
  );
}
