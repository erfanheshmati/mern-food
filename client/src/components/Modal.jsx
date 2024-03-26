import React, { useState } from 'react'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAuth from '../hooks/useAuth';

export default function Modal() {
    const { register, handleSubmit } = useForm();

    const { signUpWithGmail, logIn } = useAuth()

    const [errorMessage, setErrorMessage] = useState("")

    const axiosPublic = useAxiosPublic()

    // redirecting to home page or specific page
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"

    // sign-in using email and password 
    const onSubmit = (data) => {
        const email = data.email
        const password = data.password
        logIn(email, password)
            .then(() => {
                const userInfo = {
                    name: data.name,
                    email: data.email,
                }
                axiosPublic.post("/user", userInfo)
                document.getElementById("my_modal").close()
                navigate(from, { replace: true })
            })
            .catch(() => {
                setErrorMessage("Enter correct email and password")
            })
    }

    // sign-in using gmail
    const handleLogin = () => {
        signUpWithGmail()
            .then((result) => {
                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                }
                axiosPublic.post("/user", userInfo)
                    .then(() => {
                        document.getElementById("my_modal").close()
                        navigate(from, { replace: true })
                    })
            })
            .catch((error) => setErrorMessage(error.code))
    }

    return (
        <dialog dialog id="my_modal" className="modal modal-middle sm:modal-middle max-w-md mx-auto" >
            <div className="modal-box bg-white">
                <div className="modal-action flex-col m-0">
                    <form className="card-body p-0 md:px-4 md:pt-0 md:pb-4" method='dialog' onSubmit={handleSubmit(onSubmit)}>
                        {/* close btn */}
                        <div className='self-end'>
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost">✕</button>
                            </form>
                        </div>
                        {/* email input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-secondary">Email</span>
                            </label>
                            <input type="email" placeholder="example@gmail.com" className="input input-bordered bg-white" {...register('email')} />
                        </div>
                        {/* password input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-secondary">Password</span>
                            </label>
                            <input type="password" placeholder="********" className="input input-bordered bg-white" {...register('password')} />
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
                                value="Login"
                            />
                        </div>
                    </form>
                    {/* signup link */}
                    <div className='flex items-center justify-center gap-1 mt-6 mb-3 text-secondary'>
                        Dont have an account?
                        <Link to="/signup" className="label-text-alt link link-hover text-sm text-red">Signup</Link>
                    </div>
                    {/* login with socials */}
                    <div className='flex flex-row items-center justify-center gap-2 mt-4 mb-2'>
                        <button
                            className="btn btn-circle border-none bg-gray-300 text-secondary hover:bg-green hover:text-white"
                            onClick={handleLogin}
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
            </div>
        </dialog >
    )
}
