'use client'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

type AdditionalReqProps = {
  AdditionalRequirementInput: (value: string) => void
}

const AdditionalReq = ({AdditionalRequirementInput}: AdditionalReqProps) => {
  return (
    <div className='mt-5'>
      <label htmlFor="" className=''>Enter Additional Requirements (Optional)</label>
      <Textarea className='mt-2' onChange={(e) => AdditionalRequirementInput(e.target.value)}/>
    </div>
  )
}

export default AdditionalReq