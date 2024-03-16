import React from 'react'
import useMenu from '../../../hooks/useMenu'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Swal from "sweetalert2"
import useAxiosSecure from "../../../hooks/useAxiosSecure"

export default function ManageItems() {
    const [menu, loading, refetch] = useMenu()
    const axiosSecure = useAxiosSecure()

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                refetch()
                Swal.fire(
                    'Successfully Done',
                    'Your menu item has been deleted',
                    'success'
                )
            }
        })
    }

    return (
        <div className='w-full lg:w-[870px] md:px-4'>
            <h2 className='text-2xl font-semibold'>Manage all <span className='text-green'>menu item</span></h2>
            {/* menu items table */}
            <div className='mt-6'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-green text-white'>
                            <tr className='border-none'>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menu.map((item, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <Link to={`/dashboard/update-menu/${item._id}`}>
                                            <button className="btn btn-ghost btn-xs bg-orange-500 text-white hover:bg-orange-300">
                                                <FaEdit />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-ghost btn-xs bg-rose-500 text-white hover:bg-rose-300"
                                            onClick={() => handleDeleteItem(item)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}
