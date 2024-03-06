import React, { useEffect, useState } from 'react'
import logo from "/logo.png"
import { BiPhoneCall } from "react-icons/bi"

export default function Navbar() {
    const [isSticky, setIsSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.addEventListener('scroll', handleScroll)
        }
    }, [])

    const navItems = (
        <>
            <li>
                <a href='/'>Home</a>
            </li>
            <li tabIndex={0}>
                <details>
                    <summary>Menu</summary>
                    <ul className="p-2 bg-white">
                        <li><a>All</a></li>
                        <li><a>Pitza</a></li>
                        <li><a>Salad</a></li>
                    </ul>
                </details>
            </li>
            <li tabIndex={0}>
                <details>
                    <summary>Services</summary>
                    <ul className="p-2 bg-white w-40">
                        <li><a>Online Ordering</a></li>
                        <li><a>Table Booking</a></li>
                        <li><a>Order Tracking</a></li>
                    </ul>
                </details>
            </li>
            <li>
                <a href='/'>Offers</a>
            </li>
        </>
    )

    return (
        <header className='mx-auto fixed top-0 left-0 right-0 text-secondary'>
            <div className={`navbar xl:px-24 ${isSticky ? "shadow-md bg-white transition-all duration-300 ease-in-out" : ""}`}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-white shadow-xl rounded-box w-52">
                            {navItems}
                        </ul>
                    </div>
                    <div className='ml-2 lg:ml-0'>
                        <a href='/'>
                            <img src={logo} alt="" />
                        </a>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className='navbar-end'>
                    <div className='flex items-center gap-3'>
                        {/* search btn */}
                        <div className='mt-1 hidden md:block'>
                            <button className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                        {/* cart btn */}
                        <div className="dropdown mt-1 hidden md:block">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge badge-sm indicator-item badge-outline bg-white p-1">8</span>
                                </div>
                            </div>
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-white shadow-md">
                                <div className="card-body">
                                    <span className="font-bold text-lg">8 Items</span>
                                    <span className="text-info">Subtotal: $999</span>
                                    <div className="card-actions">
                                        <button className="btn btn-block border-none bg-green text-white hover:bg-green hover:text-white hover:opacity-70">View cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* contact btn */}
                        <div>
                            <a className="btn border-none bg-green rounded-full px-5 text-white flex items-center gap-2 hover:bg-green hover:text-white hover:opacity-70">
                                <BiPhoneCall /> Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
