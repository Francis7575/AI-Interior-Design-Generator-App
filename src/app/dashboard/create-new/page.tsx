'use client'
import React, { useState } from 'react'
import ImageSelection from './_components/ImageSelection'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalReq from './_components/AdditionalReq'
import { Button } from '@/components/ui/button'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/config/firebase'
import { useUser } from '@clerk/nextjs'
import CustomLoading from './_components/CustomLoading'
import { fieldNameProps } from '@/types/types'
import AiOutputDialog from '../_components/AiOutputDialog'


function CreateNew() {
  const { user } = useUser()
  const [formData, setFormData] = useState<fieldNameProps>({});
  const [loading, setLoading] = useState<boolean>(false)
  const [aiOutputImage, setAiOutputImage] = useState<string>('')
  const [openOutputDialog, setOpenOutputDialog] = useState<boolean>(false)
  const [orgImage, setOrgImage] = useState<string>('')

  const handleInputChange = (value: any, fieldname: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldname]: value
    }))
  }

  const GenerateAiImage = async () => {
    setLoading(true)
    const rawImageUrl = await SaveRawImageToFirebase();
    try {
      const response = await fetch('/api/redesign-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: rawImageUrl,
          roomType: formData.roomType,
          designType: formData.designType,
          additionalReq: formData.additionalReq,
          userEmail: user?.primaryEmailAddress?.emailAddress
        })
      })
      if (!response.ok) {
        throw new Error('Failed to generate AI image')
      }

      const data = await response.json();
      setAiOutputImage(data.result)
      setOpenOutputDialog(true)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const SaveRawImageToFirebase = async () => {
    const fileName = Date.now() + "_raw.png";
    const imageRef = ref(storage, 'room-redesign/' + fileName)

    try {
      await uploadBytes(imageRef, formData.image as Blob | Uint8Array | ArrayBuffer); // Pass the image directly
      console.log('File uploaded...');

      const downloadUrl = await getDownloadURL(imageRef);
      setOrgImage(downloadUrl)
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
      <CustomLoading loading={loading} />
      <AiOutputDialog
        openDialog={openOutputDialog}
        closeDialog={() => setOpenOutputDialog(false)}
        orgImage={orgImage}
        aiImage={aiOutputImage}
        />
    </div>
  )
}

export default CreateNew