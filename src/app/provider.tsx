"use client"
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { userContext } from '@/context/UserContext'
import { UserInfo, ProviderProps } from "@/types/types";

const Provider = ({ children }: ProviderProps) => {
	const { user } = useUser();
	const [userDetail, setuserDetail] = useState<UserInfo | []>([])

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
		<userContext.Provider value={{userDetail, setuserDetail}}>
			<div>
				{children}
			</div>
		</userContext.Provider>
	)
}

export default Provider