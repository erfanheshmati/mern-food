import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'

export default function Order() {
    const { user } = useAuth()
    const token = localStorage.getItem("access-token")

    const { refetch, data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/payment?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return res.json()
        }
    })

    const formatDate = (createdAt) => {
        const createdAtDate = new Date(createdAt)
        return createdAtDate.toLocaleDateString()
    }


    return (
        <div className='section-container min-h-screen py-28'>

            {/* banner */}
            <div className="py-10 lg:pt-10 lg:pb-20 flex flex-col items-center justify-center">
                {/* content */}
                <div className=" text-center px-4 space-y-7">
                    <h2 className="text-3xl md:text-5xl font-bold">
                        Track All Your<span className="text-green"> Orders</span>
                    </h2>
                </div>
            </div>


            {/* order items */}
            < div className="overflow-x-auto rounded-md">
                {/* order table */}
                < table className="table" >
                    {/* head */}
                    < thead className='bg-green text-white' >
                        <tr className='border-none'>
                            <th>#</th>
                            <th>Date</th>
                            <th>Transaction ID</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead >
                    <tbody>
                        {/* row */}
                        {orders.map((item, index) => (
                            <tr key={index} className='border-gray-300'>
                                <td>{index + 1}</td>
                                <td>{formatDate(item.createdAt)}</td>
                                <td>{item.transactionId}</td>
                                <td>${item.price}</td>
                                <td>{item.status}</td>
                                <td>
                                    <Link to="/contact" className="btn btn-ghost btn-sm text-red">
                                        Contact
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table >
            </div >

        </div>
    )
}
