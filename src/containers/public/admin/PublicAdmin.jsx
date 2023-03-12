import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderAdmin from '../../../components/HeaderAdmin'

const PublicAdmin = () => {
 return (
    <>
      <HeaderAdmin />
      <div id="auth-wrapper">
        <Outlet />
      </div>
    </>
 )
}

export default PublicAdmin
