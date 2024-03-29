import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Profile({ user }) {
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
            <div className="drawer drawer-end z-50">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* page content here */}
                    <label htmlFor="my-drawer" className='drawer-button btn btn-ghost btn-circle'>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {user.photoURL ? <img src={user.photoURL} alt='' /> : <img src="/images/profile/profile-pic.png" alt='' />}
                            </div>
                        </div>
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-48 md:w-80 min-h-full bg-gray-200 shadow-2xl text-secondary">
                        {/* sidebar content here */}
                        <li><Link to="/update-profile">Profile</Link></li>
                        <li><Link to="/order">Order</Link></li>
                        <li><a>Settings</a></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
