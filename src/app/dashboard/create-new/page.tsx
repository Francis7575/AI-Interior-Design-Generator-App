'use client'
import React, { useState } from 'react'
import ImageSelection from './_components/ImageSelection'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalReq from './_components/AdditionalReq'
import { Button } from '@/components/ui/button'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/config/firebase'

type fieldNameProps = {
  image?: Blob | Uint8Array | ArrayBuffer;
  roomType?: string;
  designType?: string;
  additionalReq?: string;
}

function CreateNew() {
  const [formData, setFormData] = useState<fieldNameProps>({});

  const handleInputChange = (value: any, fieldname: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldname]: value
    }))
  }

  const GenerateAiImage = async () => {
    const rawImageUrl = await SaveRawImageToFirebase();
    // try {
    //   const response = await fetch('/api/redesign-room', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   })
    //   if (!response.ok) {
    //     throw new Error('Failed to generate AI image')
    //   }

    //   const data = await response.json();
    //   console.log(data)
    // } catch (err) {
    //   console.log(err)
    // }
  }

  const SaveRawImageToFirebase = async () => {
    const fileName = Date.now()+"_raw.png";
    const imageRef = ref(storage, 'room-redesign/'+fileName)

    try {
      await uploadBytes(imageRef, formData.image as Blob | Uint8Array | ArrayBuffer); // Pass the image directly
      console.log('File uploaded...');
  
      const downloadUrl = await getDownloadURL(imageRef);
      console.log(downloadUrl);
      return downloadUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
    }
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
        <ImageSelection selectedImage={(value) => handleInputChange(value, 'image')} />
        <div>
          <RoomType selectedRoomType={(value) => handleInputChange(value, 'roomType')} />
          <DesignType selectedDesignType={(value) => handleInputChange(value, 'designType')} />
          <AdditionalReq AdditionalRequirementInput={(value) => handleInputChange(value, 'additionalReq')} />
          <Button onClick={GenerateAiImage} className='w-full mt-2'>
            Generate
          </Button>
          <p className='text-sm text-gray-400 mb-20'>Note: 1 Credit will be use to redesign your room</p>
        </div>
      </div>
    </div>
  )
}

export default CreateNew