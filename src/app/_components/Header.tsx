'use client'
import { Button } from "@/components/ui/button"
import { userContext } from "@/context/UserContext"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { LayoutDashboard } from 'lucide-react'
import Tooltip from './Tooltip'

const Header = () => {
  const context = useContext(userContext);
  if (!context) {
    return null;
  }
  const { userDetail } = context;

  return (
    <header className="p-5 shadow-sm flex justify-between items-center">
      <Link href={'/'} className="flex items-center gap-2">
        <Image src={'/logo.svg'} width={40} height={40} alt="" className="hover:opacity-70" />
        <h2 className="font-bold text-lg hidden md:block hover:text-primary">AI Room Design</h2>
      </Link>
      <Link href="/dashboard/buy-credits">
        <Button variant="ghost" className="rounded-full text-primary">
          Buy More Credits
        </Button>
      </Link>
      <div className="flex items-center gap-2 md:gap-6">
        <div className="flex gap-2 py-1 items-center bg-slate-200 px-4 rounded-full">
          <Image src={'/star.png'} width={20} height={20} alt="" />
          <span className="font-semibold">{userDetail?.credits}</span>
        </div>
        <UserButton />
        <Link href="/dashboard">
          <Tooltip text="Go to Dashboard">
            <LayoutDashboard className="dashboard-icon" />
          </Tooltip>
        </Link>
      </div>
    </header>
  )
}

export default Header