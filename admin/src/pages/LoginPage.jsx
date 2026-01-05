import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='hero'>
        <SignIn />
    </div>
  )
}

export default LoginPage
