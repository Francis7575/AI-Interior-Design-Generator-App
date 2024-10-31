'use client'

import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import EmptyState from "./EmptyState"

const Listing = () => {
  const { user } = useUser()
  const [userRoomList, setUserRoomList] = useState([])

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-3xl">Hello {user?.fullName}</h2>
        <Button>+ Redesign Room</Button>
      </div>

      {userRoomList.length == 0 ?
        <EmptyState />
        :
        <div></div>
      }
    </div>
  )
}

export default Listing