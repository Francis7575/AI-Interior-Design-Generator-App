"use client"
import { ReactNode } from 'react'

interface ProviderProps {
  children: ReactNode
}

const Provider = ({children}: ProviderProps) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Provider