"use client"
import { useUser } from '@clerk/nextjs'
import { ReactNode, useEffect } from 'react'

interface ProviderProps {
	children: ReactNode
}

const Provider = ({ children }: ProviderProps) => {
const { user } = useUser();

	useEffect(() => {
		if (user) verifyUser();
	}, [user])
	
	const verifyUser = async () => {
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
		console.log(data)
		return data
	}
	return (
		<div>
			{children}
		</div>
	)
}

export default Provider