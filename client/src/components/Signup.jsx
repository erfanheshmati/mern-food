import React, { useState } from 'react'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import Modal from './Modal';
import toast, { Toaster } from 'react-hot-toast'
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAuth from '../hooks/useAuth';

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { createUser, updateUserProfile, signUpWithGmail } = useAuth()

    const [errorMessage, setErrorMessage] = useState("")

    const axiosPublic = useAxiosPublic()

    // redirecting to home page or specific page
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"

    // sign-up using email and password
    const onSubmit = (data) => {
        const email = data.email
        const password = data.password
        createUser(email, password)
            .then(() => {
                updateUserProfile(data.email, data.photoURL).then(() => {
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                    }
                    axiosPublic.post("/user", userInfo)
                    toast.success('Account created successfully', { className: "mt-6 2xl:mt-12" })
                    setTimeout(() => navigate(from, { replace: true }), 1500)
                })
            })
            .catch((error) => setErrorMessage(error.code))
    }

    // sign-up using gmail
    const handleRegister = () => {
        signUpWithGmail()
            .then((result) => {
                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                }
                axiosPublic.post("/user", userInfo)
                navigate(from, { replace: true })
            })
            .catch((error) => console.log(error.code))
    }

    return (
        <div className='h-screen flex items-center justify-center px-4'>
            <Toaster />
            <div className='max-w-md shadow-2xl rounded-2xl w-full'>
                <div className="modal-action text-secondary flex flex-col m-0">
                    <form className="card-body" method='dialog' onSubmit={handleSubmit(onSubmit)}>
                        {/* close btn */}
                        <div className='self-end'>
                            <form method="dialog">
                                <Link to="/" className="btn btn-sm btn-circle btn-ghost">✕</Link>
                            </form>
                        </div>
                        {/* name input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-secondary">Name</span>
                            </label>
                            <input type="text" placeholder="John Doe" className="input input-bordered bg-white" {...register('name')} required />
                        </div>
                        {/* email input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-secondary">Email</span>
                            </label>
                            <input type="email" placeholder="example@gmail.com" className="input input-bordered bg-white" {...register('email')} required />
                        </div>
                        {/* password input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-secondary">Password</span>
                            </label>
                            <input type="password" placeholder="********" className="input input-bordered bg-white" {...register('password')} required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-sm">Forgot password?</a>
                            </label>
                        </div>
                        {/* errors */}
                        {errorMessage ? <p className='text-red text-sm px-1'>{errorMessage}</p> : ""}
                        {/* login btn */}
                        <div className="form-control mt-4">
                            <input
                                type='submit'
                                className="btn border-none bg-green text-white hover:bg-green hover:text-white hover:opacity-70"
                                value="Signup"
                            />
                        </div>
                    </form>
                    {/* signup link */}
                    <div className='flex items-center justify-center gap-1 -mt-3'>
                        Have an account?
                        <button
                            onClick={() => document.getElementById('my_modal').showModal()}
                            className="label-text-alt link link-hover text-sm text-red"
                        >
                            Login
                        </button>
                    </div>
                    {/* login with socials */}
                    <div className='flex flex-row items-center justify-center gap-2 mt-4 mb-6'>
                        <button
                            className="btn btn-circle border-none bg-gray-300 text-secondary hover:bg-green hover:text-white"
                            onClick={handleRegister}
                        >
                            <FaGoogle />
                        </button>
                        <button className="btn btn-circle border-none bg-gray-300 text-secondary hover:bg-green hover:text-white">
                            <FaFacebook />
                        </button>
                        <button className="btn btn-circle border-none bg-gray-300 text-secondary hover:bg-green hover:text-white">
                            <FaGithub />
                        </button>
                    </div>
                </div>
                <Modal />
            </div>
        </div>
    )
}
