"use client";

import { createContext, useContext, useState } from "react";

export const DrawerContext = createContext({} as any);

export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  return useContext(DrawerContext);
};

export default DrawerProvider;
