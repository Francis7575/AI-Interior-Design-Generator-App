import { ReactNode } from "react";

export type ProviderProps = {
	children: ReactNode
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