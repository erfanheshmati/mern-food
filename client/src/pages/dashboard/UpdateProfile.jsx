import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { AuthContext } from '../../contexts/AuthProvider'
import { useLocation, useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
    const { updateUserProfile } = useContext(AuthContext)

    const { register, handleSubmit } = useForm()

    // redirecting to home page or specific page
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"

    const onSubmit = (data) => {
        const name = data.name
        const photoURL = data.photoURL
        updateUserProfile(name, photoURL).then(() => navigate(from, { replace: true }))
    }

    return (
        <div className='flex items-center justify-center h-screen px-4'>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className='text-center font-bold'>Update Your Profile</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-secondary">Full Name</span>
                        </label>
                        <input type="text" placeholder="John Doe" className="input input-bordered bg-white" {...register("name")} required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-secondary">Upload Photo</span>
                        </label>
                        <input type="text" placeholder="Photo URL" className="input input-bordered bg-white" {...register("photoURL")} required />
                        {/* <input type="file" className="file-input bg-white" /> */}
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn border-none bg-green text-white hover:bg-green hover:text-white hover:opacity-70">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
