import { ReactNode } from "react";

export type ProviderProps = {
	children: ReactNode
}

export type RoomList = {
  id: number
  roomType: string 
  designType: string
  orgImage: string 
  aiImage: string 
  userEmail: string | null
}

export type fieldNameProps = {
  image?: Blob | Uint8Array | ArrayBuffer;
  roomType?: string;
  designType?: string;
  additionalReq?: string;
}

export type UserInfo = {
  id?: number;
  credits?: number;
  email?: string
  imageUrl?: string
  name?: string
}