import React from 'react'
import { MdOutlineMailOutline } from "react-icons/md"
import { PiPhoneOutgoingBold } from "react-icons/pi"
import { FaWhatsapp } from "react-icons/fa"
import { RiTelegramLine } from "react-icons/ri"
import { FaInstagram } from "react-icons/fa"

export default function Footer() {
    return (
        <div className='section-container bg-gray-50 text-secondary'>
            <footer className="footer py-20 ">
                <aside>
                    <img src="/logo.png" alt="" />
                    <p className='my-5 w-40'>Savor the artistry where every dish is a culinary masterpiece.</p>
                </aside>
                <nav>
                    <h6 className="footer-title text-black">Useful Links</h6>
                    <a className="link link-hover">About Us</a>
                    <a className="link link-hover">Events</a>
                    <a className="link link-hover">Blogs</a>
                    <a className="link link-hover">FAQ</a>
                </nav>
                <nav>
                    <h6 className="footer-title text-black">Main Menu</h6>
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">Offers</a>
                    <a className="link link-hover">Menus</a>
                    <a className="link link-hover">Reservation</a>
                </nav>
                <nav>
                    <h6 className="footer-title text-black">Contact Us</h6>
                    <a className="link link-hover flex items-center gap-1"><MdOutlineMailOutline />Example@info.com</a>
                    <a className="link link-hover flex items-center gap-1"><PiPhoneOutgoingBold />+64 958 248 966</a>
                    <span className="flex items-center gap-2">
                        <a href=""><FaWhatsapp className='w-5 h-5 hover:opacity-70' /></a>
                        <a href=""><RiTelegramLine className='w-5 h-5 hover:opacity-70' /></a>
                        <a href=""><FaInstagram className='w-5 h-5 hover:opacity-70' /></a>
                    </span>
                </nav>
            </footer>
            <hr />
            <div className="py-6 text-center">
                <span className='text-md'>&#169; 2024 Design & Developed By Erfan Heshmati | All rights reserved.</span>
            </div>
        </div>
    )
}
