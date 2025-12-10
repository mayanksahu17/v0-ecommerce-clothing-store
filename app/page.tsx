import React from 'react'
import { redirect } from 'next/navigation'

const page = () => {
  redirect('/about')
}

export default page