import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const EmptyState = () => {
  return (
    <div className="flex items-center justify-center mt-10 flex-col">
      <Image src={'/room.png'} height={200} width={200} alt="" />
      <h2 className="font-medium text-xl text-gray-500">Create New AI interior Design for your room</h2>
      <Link href="/dashboard/create-new">
        <Button className="mt-5">+ Redesign Room</Button>
      </Link>
    </div>
  )
}

export default EmptyState