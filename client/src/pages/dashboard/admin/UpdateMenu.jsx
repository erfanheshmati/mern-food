import React from 'react'
import { useForm } from 'react-hook-form'
import { useLoaderData, useNavigate } from 'react-router-dom'
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { FaUtensils } from 'react-icons/fa'
import Swal from "sweetalert2"

export default function UpdateMenu() {
    const item = useLoaderData()

    const { register, handleSubmit, reset } = useForm()

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const navigate = useNavigate()

    // image hosting
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (hostingImg.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: hostingImg.data.data.display_url
            }
            const postMenuItem = axiosSecure.patch(`/menu/${item._id}`, menuItem)
            if (postMenuItem) {
                reset()
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your item has been updated successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate("/dashboard/manage-items")
            }
        }
    }

    return (
        <div className='w-full lg:w-[870px] md:px-4'>
            <h2 className='text-2xl font-semibold'>Update this <span className='text-green'>menu item</span></h2>
            {/* form */}
            <div className='my-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* 1st row */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-secondary">Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Item's Name"
                            className="input input-bordered bg-white w-full"
                            defaultValue={item.name}
                            {...register("name", { required: true })}
                        />
                    </div>
                    {/* 2nd row */}
                    <div className='flex items-center gap-6'>
                        <div className="form-control w-1/2 my-2 md:my-4">
                            <label className="label">
                                <span className="label-text text-secondary">Category*</span>
                            </label>
                            <select
                                className="select select-bordered bg-white"
                                defaultValue={item.category}
                                {...register("category", { required: true })}
                            >
                                <option disabled value="default">Select One</option>
                                <option value="pitza">Pitza</option>
                                <option value="salad">Salad</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drink">Drink</option>
                                <option value="popular">Popular</option>
                            </select>
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text text-secondary">Price*</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2 bg-white">
                                <span>$</span>
                                <input
                                    type="number"
                                    placeholder="Item's Price"
                                    className="grow"
                                    defaultValue={item.price}
                                    {...register("price", { required: true })}
                                />
                            </label>
                        </div>
                    </div>
                    {/* 3rd row */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-secondary">Recipe*</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered bg-white h-24"
                            placeholder="Recipe Details"
                            defaultValue={item.recipe}
                            {...register("recipe", { required: true })}
                        ></textarea>
                    </div>
                    {/* 4th row */}
                    <div className="form-control mt-3">
                        <label className="label">
                            <span className="label-text text-secondary">Upload Image*</span>
                        </label>
                        <input
                            type="file"
                            className="file-input file-input-ghost file-input-bordered bg-white"
                            {...register("image", { required: true })}
                        />
                    </div>
                    {/* btn */}
                    <div className='mt-8'>
                        <button className='btn border-none bg-green text-white hover:bg-green hover:text-white hover:opacity-70'>
                            Update Item<FaUtensils />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
