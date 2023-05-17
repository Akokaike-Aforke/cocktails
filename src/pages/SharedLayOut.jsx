import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const SharedLayOut = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}

export default SharedLayOut