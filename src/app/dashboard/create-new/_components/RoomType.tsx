'use client'
import React from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

type RoomTypeProps = {
  selectedRoomType: (value: string) => void
}

const RoomType = ({selectedRoomType}: RoomTypeProps) => {
  return (
    <div className='mb-4 max-w-[300px] z-40'>
      <label htmlFor='room-type-select' className="text-slate-400">Select Room Type *</label>
      <Select onValueChange={(value) => selectedRoomType(value)}>
        <SelectTrigger id="room-type-select">
          <SelectValue placeholder="Room Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Living">Living Room</SelectItem>
          <SelectItem value="Bedroom">Bedroom</SelectItem>
          <SelectItem value="Kitchen">Kitchen</SelectItem>
          <SelectItem value="Office">Office</SelectItem>
          <SelectItem value="Bathroom">Bathroom</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default RoomType