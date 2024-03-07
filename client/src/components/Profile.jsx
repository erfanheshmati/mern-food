import React from 'react'

export default function Profile({ user }) {
    return (
        <div>
            <div className="drawer drawer-end z-50">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className='drawer-button btn btn-ghost btn-circle'>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {user.photoURL ? <img src={user.photoURL} alt='' /> : <img src="/images/profile/profile-pic.png" alt='' />}
                            </div>
                        </div>
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-48 md:w-80 min-h-full bg-neutral-200 shadow-2xl text-secondary">
                        {/* Sidebar content here */}
                        <li><a>Profile</a></li>
                        <li><a>Order</a></li>
                        <li><a>Setting</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
