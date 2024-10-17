import React from 'react'
  

import dynamic from 'next/dynamic'
const TermsAndCondition = dynamic(() => import('../../components/TermsandCondition/TermsAndCondition'))

export default function page() {
  return (
   <TermsAndCondition/>
  )
}
