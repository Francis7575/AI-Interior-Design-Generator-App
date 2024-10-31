'use client'

import { UserInfo } from "@/types/types";
import { createContext } from "react";

interface UserContextType {
  userDetail: UserInfo | null;
  setuserDetail: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

export const userContext = createContext<UserContextType | null>(null);