'use client'
import { Button } from "@/components/ui/button"
import { userContext } from "@/context/UserContext"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import { useContext } from "react"

const Header = () => {
  const context = useContext(userContext);
  if (!context) {
    return null;
  }
  const { userDetail, setuserDetail } = context;

  return (
    <header className="p-5 shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Image src={'/logo.svg'} width={40} height={40} alt="" />
        <h2 className="font-bold text-lg">AI Room Design</h2>
      </div>
      <Button variant="ghost" className="rounded-full text-primary">
        Buy More Credits
      </Button>
      <div className="flex items-center gap-6">
        <div className="flex gap-2 py-1 items-center bg-slate-200 px-4 rounded-full">
          <Image src={'/star.png'} width={20} height={20} alt="" />
          <span>{userDetail?.credits}</span>
        </div>
        <UserButton />
      </div>
    </header>
  )
}

export default Header