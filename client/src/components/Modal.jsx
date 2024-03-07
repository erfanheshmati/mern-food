import React from 'react'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import { Link } from "react-router-dom"

export default function Modal() {
    return (
        <dialog id="my_modal" className="modal modal-middle sm:modal-middle">
            <div className="modal-box bg-white pt-0 md:pt-2">
                <div className="modal-action flex-col">
                    <form className="card-body p-0 md:px-4 md:pt-0 md:pb-4" method='dialog'>
                        {/* close btn */}
                        <div className='self-end'>
                            <form method="dialog">
                                <button className="btn btn-circle border-none bg-gray-100 hover:bg-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </form>
                        </div>
                        {/* form inputs */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-secondary">Email</span>
                            </label>
                            <input type="email" placeholder="example@gmail.com" className="input input-bordered bg-white" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-secondary">Password</span>
                            </label>
                            <input type="password" placeholder="********" className="input input-bordered bg-white" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        {/* errors */}

                        {/* login btn */}
                        <div className="form-control mt-4">
                            <input
                                type='submit'
                                className="btn border-none bg-green text-white hover:bg-green hover:text-white hover:opacity-70"
                                value="Login"
                            />
                        </div>
                        {/* signup link */}
                        <div className='flex items-center justify-center gap-1 mt-1'>
                            Dont have an account?
                            <Link to="/signup" className="label-text-alt link link-hover text-sm text-red">Signup Now</Link>
                        </div>
                        {/* login with socials */}
                        <div className='flex flex-row items-center justify-center gap-2 mt-3 mb-1'>
                            <button className="btn btn-circle border-none bg-gray-300 text-secondary hover:bg-green hover:text-white">
                                <FaGoogle />
                            </button>
                            <button className="btn btn-circle border-none bg-gray-300 text-secondary hover:bg-green hover:text-white">
                                <FaFacebook />
                            </button>
                            <button className="btn btn-circle border-none bg-gray-300 text-secondary hover:bg-green hover:text-white">
                                <FaGithub />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
