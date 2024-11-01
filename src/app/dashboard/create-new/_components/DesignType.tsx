'use client'
import Image from "next/image"
import { useState } from "react"

type Options = {
  name: string
  image: string
}
type selectedDesignProps = {
  selectedDesignType: (value: string) => void
}

const DesignType = ({selectedDesignType}: selectedDesignProps) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

  const designOptions: Options[] = [
    { name: 'Modern', image: '/modern.png' },
    { name: 'Industrial', image: '/industrial.png' },
    { name: 'Minimalist', image: '/minimalist.png' },
    { name: 'Rustic', image: '/rustic.png' },
    { name: 'Traditional', image: '/traditional.png' }
  ]

  return (
    <div>
      <h3 className="text-gray-500">Select Interior Design Type</h3>
      <div className={`grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] mt-5 gap-5`}>
        {designOptions.map((option: Options, idx: number) => (
          <button key={idx} className="flex flex-col"
            onClick={() => {setSelectedOption(option.name); selectedDesignType(option.name)}}>
            <Image src={option.image} height={100} width={100} alt=""
              className={`max-w-[140px] rounded-md hover:scale-105 transition-all w-full h-[70px] 
              object-fill ${option.name === selectedOption && 'border-2 border-primary rounded-md p-1'}`} />
            <p className="mt-2">{option.name}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DesignType