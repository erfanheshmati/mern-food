import React, { useContext } from 'react'
import { FaEdit, FaHome, FaLocationArrow, FaPlusCircle, FaQuestionCircle, FaShoppingBag, FaUsers } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { MdDashboard, MdDashboardCustomize } from 'react-icons/md'
import { TbLogout } from "react-icons/tb"
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import useAdmin from "../hooks/useAdmin"
import useAuth from '../hooks/useAuth'
import { TiArrowBackOutline } from "react-icons/ti"
import { AuthContext } from '../contexts/AuthProvider'

const sharedLinks = (
    <>
        <li>
            <Link to="/">
                <FaHome />Home
            </Link>
        </li>
        <li>
            <Link to="/menu">
                <FaCartShopping />Menu
            </Link>
        </li>
        <li>
            <Link to="/menu">
                <FaLocationArrow />Orders Tracking
            </Link>
        </li>
        <li>
            <Link to="/menu">
                <FaQuestionCircle />Customer Support
            </Link>
        </li>
    </>
)

export default function DashboardLayout() {
    // const [isAdmin, isAdminLoading] = useAdmin()
    const isAdmin = true

    const { logOut } = useContext(AuthContext)

    // redirecting to home page or specific page
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"

    const handleLogout = () => {
        logOut().then(() => navigate(from, { replace: true }))
    }

    return (
        <div>
            {isAdmin ? (
                <div className='bg-primaryBG text-secondary min-h-screen'>
                    <div className="drawer lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col lg:items-start lg:justify-start">
                            {/* page content here */}
                            <div className='flex items-center justify-between p-4'>
                                <label htmlFor="my-drawer-2" className="btn border-none bg-green text-white hover:bg-green hover:text-white hover:opacity-70 drawer-button lg:hidden">
                                    <MdDashboardCustomize />Admin Panel
                                </label>
                                <button
                                    onClick={handleLogout}
                                    className='btn border-none bg-green text-white hover:bg-green hover:text-white hover:opacity-70 lg:hidden'
                                >
                                    <TbLogout />Log Out
                                </button>
                            </div>
                            <div className='mt-5 lg:mt-0 px-4'>
                                <Outlet />
                            </div>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-52 md:w-60 lg:w-64 2xl:w-72 min-h-full bg-gray-200">
                                {/* sidebar content here */}
                                <li>
                                    <Link to="/dashboard">
                                        <img src="/logo.png" alt="" />
                                    </Link>
                                </li>
                                <hr className='h-1 border bg-gray-300 rounded-md my-2' />
                                <li>
                                    <Link to="/dashboard">
                                        <MdDashboard />Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard">
                                        <FaShoppingBag />Manage Bookings
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/add-menu">
                                        <FaPlusCircle />Add Menu
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/manage-items">
                                        <FaEdit />Manage Items
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/users">
                                        <FaUsers />All Users
                                    </Link>
                                </li>
                                <hr className='h-1 border bg-gray-300 rounded-md my-2' />
                                {/* shared nav links */}
                                {sharedLinks}
                            </ul>

                        </div>
                    </div>
                </div>
            ) : (
                <div className='bg-primaryBG h-screen flex flex-col items-center justify-center text-red font-bold text-4xl px-4'>
                    <img src="/images/dashboard/Prohibited.webp" alt="" className='size-80' />
                    <div>Forbidden Access!</div>
                    <Link to="/" className="btn border-none bg-black text-white hover:bg-black hover:text-white hover:opacity-70 mt-3">
                        <TiArrowBackOutline className='w-4 h-4' /> Back to Home
                    </Link>
                </div>
            )}
        </div>
    )
}
