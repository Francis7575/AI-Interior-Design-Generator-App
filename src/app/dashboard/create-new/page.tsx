'use client'
import React, { useState } from 'react'
import ImageSelection from './_components/ImageSelection'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalReq from './_components/AdditionalReq'
import { Button } from '@/components/ui/button'

type fieldNameProps = {
  image?: string;
  roomType?: string;
  designType?: string;
  additionalReq?: string;
}

function CreateNew() {
  const [formData, setFormData] = useState<fieldNameProps[]>([])

  const handleInputChange = (value: any, fieldname: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldname]: value
    }))
  }

  return (
    <div className='max-w-[1100px] mx-auto'>
      <h2 className='font-bold text-4xl text-primary text-center'>
        Experience the magic of AI Remodeling
      </h2>
      <p className='text-center text-gray-500 mt-4'>
        Transform any room with a click. Select a space, choose a style, and watch as AI instantly reimagines your environment.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-[350px_1fr] mt-10 gap-10'>
        <ImageSelection selectedImage={(value: any) => handleInputChange(value, 'image')} />
        <div>
          <RoomType selectedRoomType={(value: any) => handleInputChange(value, 'roomType')} />
          <DesignType selectedDesignType={(value: any) => handleInputChange(value, 'designType')} />
          <AdditionalReq AdditionalRequirementInput={(value: any) => handleInputChange(value, 'additionalReq')} />
          <Button className='w-full mt-2'>
            Generate
          </Button>
          <p className='text-sm text-gray-400 mb-20'>Note: 1 Credit will be use to redesign your room</p>
        </div>
      </div>
    </div>
  )
}

export default CreateNew