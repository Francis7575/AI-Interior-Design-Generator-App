'use client'

import { UserInfo } from "@/types/types";
import { createContext } from "react";

interface UserContextType {
  userDetail: UserInfo | [];
  setuserDetail: React.Dispatch<React.SetStateAction<UserInfo | []>>;
}

export const userContext = createContext<UserContextType | null>(null);