"use client";

import * as React from "react";

interface DialogContextType {
  openDialog: (id: string) => void;
  closeDialog: (id: string) => void;
  isOpen: (id: string) => boolean;
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [openDialogs, setOpenDialogs] = React.useState<Set<string>>(new Set());

  const openDialog = React.useCallback((id: string) => {
    setOpenDialogs((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const closeDialog = React.useCallback((id: string) => {
    setOpenDialogs((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const isOpen = React.useCallback((id: string) => openDialogs.has(id), [openDialogs]);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, isOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function useDialogs() {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogs must be used within a DialogProvider");
  }
  return context;
}
