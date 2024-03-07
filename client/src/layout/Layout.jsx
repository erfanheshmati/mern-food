import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { AuthContext } from '../contexts/AuthProvider'
import Loading from '../components/Loading'

export default function Layout() {
    const { loading } = useContext(AuthContext)

    return (
        <div className='bg-primaryBG'>
            {loading ? <Loading /> :
                <>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </>
            }

        </div>
    )
}
