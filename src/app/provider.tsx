"use client"
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { userContext } from '@/context/UserContext'
import { modalContext } from '@/context/ModalContext'
import { UserInfo, ProviderProps } from "@/types/types";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Provider = ({ children }: ProviderProps) => {
	const { user } = useUser();
	const [userDetail, setUserDetail] = useState<UserInfo | null>(null)
	const [openDialog, setOpenDialog] = useState<boolean>(false)

	useEffect(() => {
		if (user) verifyUser();
	}, [user])

	const verifyUser = async () => {
		try {
			const response = await fetch('/api/verify-user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user: user })
			})

			if (!response.ok) {
				throw new Error('Failed to verify user');
			}

			const data = await response.json();
			setUserDetail(data.result)
			return data
		} catch (err) {
			console.error(err)
		}

	}
	return (
		<userContext.Provider value={{ userDetail, setUserDetail }}>
			<modalContext.Provider value={{ openDialog, setOpenDialog }}>
				<PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
					<div>
						{children}
					</div>
				</PayPalScriptProvider>
			</modalContext.Provider>
		</userContext.Provider>
	)
}

export default Provider