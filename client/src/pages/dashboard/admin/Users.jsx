import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { FaTrash, FaUsers } from 'react-icons/fa'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from "sweetalert2"

export default function Users() {
    const axiosSecure = useAxiosSecure()

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get("/user")
            return res.data
        }
    })

    const handleMakeAdmin = (user) => {
        axiosSecure
            .patch(`/user/admin/${user._id}`)
            .then(() => {
                refetch()
                alert(`${user.name} is admin now`)
            })
    }

    const handleDeleteUser = (user) => {
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
                await axiosSecure.delete(`/user/${user._id}`)
                refetch()
                Swal.fire(
                    'Successfully Done',
                    'User has been deleted',
                    'success'
                )
            }
        })
    }

    return (
        <div className='w-full md:px-4'>
            <div>
                <h2 className='text-2xl font-semibold'>Manage all <span className='text-green'>users</span></h2>
            </div>
            {/* table */}
            <div className="overflow-x-auto mt-6">
                <table className="table md:w-[870px]">
                    <thead className='bg-green text-white'>
                        <tr className='border-none'>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className='border-gray-300'>
                                <th>{index + 1}</th>
                                <td>{user.name || "Unknown"}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === "admin" ? "admin" :
                                        <button
                                            className='btn btn-xs border-none bg-blue-500 text-white hover:bg-blue-300'
                                            onClick={() => handleMakeAdmin(user)}
                                        >
                                            <FaUsers />
                                        </button>
                                    }
                                </td>
                                <td>
                                    <button
                                        className='btn btn-ghost btn-xs bg-rose-500 text-white hover:bg-rose-300'
                                        onClick={() => handleDeleteUser(user)}
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
    )
}
