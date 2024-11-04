'use client'

import { createContext } from "react";

interface ModalContextType {
  openDialog: boolean
  setOpenDialog: (value: boolean) => void
}

export const modalContext = createContext<ModalContextType | undefined>(undefined);
