'use client'

import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { useCallback, useEffect, useState } from "react"
import EmptyState from "./EmptyState"
import Link from "next/link"
import { db } from "@/config/db"
import { AiGeneratedImage } from "@/config/schema"
import { eq } from "drizzle-orm"
import { RoomList } from "@/types/types"
import RoomDesignCard from "./RoomDesignCard"

const Listing = () => {
  const { user } = useUser()
  const [userRoomList, setUserRoomList] = useState<RoomList[]>([])

  
 const GetUserRoomList = useCallback(async () => {
  const userEmail = user?.primaryEmailAddress?.emailAddress || '';
  const result = await db.select().from(AiGeneratedImage)
    .where(eq(AiGeneratedImage.userEmail, userEmail))

  setUserRoomList(result)
  console.log(result);
}, [user]); 

  useEffect(() => {
    if (user) {
      GetUserRoomList()
    }
  }, [user, GetUserRoomList])

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg md:text-3xl">Hello {user?.fullName}</h2>
        <Link href="/dashboard/create-new">
          <Button>+ Redesign Room</Button>
        </Link>
      </div>

      {userRoomList.length == 0 ?
        <EmptyState />
        :
        <div className="mt-10">
          <h2 className="font-medium text-md md:text-xl text-primary mb-10">AI Room Studio</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {userRoomList.map((room: RoomList, idx: number) => (
              <RoomDesignCard key={idx} room={room} />
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default Listing