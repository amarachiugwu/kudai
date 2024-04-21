import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Body from '../common/Body'
import Login from '../../pages/Login'
import SideBar from '../common/SideBar'

function Layout() {

    const authenticated = true
    
  return (
    <div>

        {authenticated ? ( 
            <>
                <Header />
                <SideBar />
                <Body />
                <Footer />
            </>
            ) : (
                <Login />
            )

        }
    </div>
  )
}

export default Layout
