'use client'
import Image from "next/image"
import { ChangeEvent, useState } from "react"

type ImageSelectionProps = {
  selectedImage: (value: string) => void
}

const ImageSelection = ({selectedImage}: ImageSelectionProps) => {
const [file, setFile] = useState<File>()

  const onFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  return (
    <div >
      <h3>Select Image of your room</h3>
      <div className="mt-3">
        <label htmlFor="upload-image">
          <div className={`flex justify-center border-primary  bg-slate-200 cursor-pointer p-28 
              border rounded-xl border-dotted hover:shadow-lg ${file && 'p-0 bg-white'}`}>
                {!file ? (
                  <Image src={'/image-upload.png'} width={70} height={70} alt="" />
                ) : (
                  <Image src={URL.createObjectURL(file)} width={300} height={300} alt="" className="object-cover w-[300px] h-[300px]"/>
                )}
          </div>
        </label>
        <input className="hidden"
          type="file"
          accept="image/*"
          id="upload-image"
          onChange={onFileSelected} />
      </div>
    </div>
  )
}

export default ImageSelection