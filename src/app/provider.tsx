"use client"
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { userContext } from '@/context/UserContext'
import { modalContext } from '@/context/ModalContext'
import { UserInfo, ProviderProps } from "@/types/types";


const Provider = ({ children }: ProviderProps) => {
	const { user } = useUser();
	const [userDetail, setuserDetail] = useState<UserInfo | null>(null)
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
			setuserDetail(data.result)
			return data
		} catch (err) {
			console.error(err)
		}

	}
	return (
		<userContext.Provider value={{ userDetail, setuserDetail}}>
			<modalContext.Provider value={{openDialog, setOpenDialog}}>
				<div>
					{children}
				</div>
			</modalContext.Provider>
		</userContext.Provider>
	)
}

export default Provider