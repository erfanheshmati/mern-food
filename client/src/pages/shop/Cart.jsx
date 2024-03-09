import React, { useContext } from 'react'
import useCart from '../../hooks/useCart'
import { FaTrash } from "react-icons/fa"
import Swal from 'sweetalert2'
import { AuthContext } from '../../contexts/AuthProvider'

export default function Cart() {
    const [cart, refetch] = useCart()

    const { user } = useContext(AuthContext)

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/cart/${item._id}`, { method: 'DELETE' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                "Deleted!",
                                "Your item has been deleted.",
                                "success"
                            )
                        }
                    })
            }
        });
    }

    return (
        <div className={`section-container bg-white min-h-screen ${cart.length === 0 ? " flex items-center justify-center" : "py-32"}`}>

            {cart.length === 0 ?
                <div className=''>
                    <img src="/images/cart/cart-empty.png" alt="" className='mx-auto' />
                </div>
                : null}

            {/* cart items */}
            <div className={`${cart.length === 0 ? "hidden" : ""}`}>
                {/* cart table */}
                <div className={`overflow-x-auto rounded-md`}>
                    {/* cart table */}
                    <table className="table">
                        {/* head */}
                        <thead className='bg-green text-white'>
                            <tr className='border-none'>
                                <th>#</th>
                                <th>Food</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row */}
                            {cart.map((item, index) => (
                                <tr key={index} className='border-gray-300'>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='font-medium'>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs text-red" onClick={() => handleDelete(item)}>
                                            <FaTrash />
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* customer details */}
                <div className='my-12 flex flex-col md:flex-row justify-between items-start gap-6'>
                    <div className='md:w-1/2 space-y-2'>
                        <h3 className='font-bold'>Customer Details</h3>
                        <p>Name: {user.displayName}</p>
                        <p>Email: {user.email}</p>
                    </div>
                    <div className='md:w-1/2 space-y-2'>
                        <h3 className='font-bold'>Shopping Details</h3>
                        <p>Total Items: {cart.length}</p>
                        <p>Total Price: $0.00</p>
                        <button className="btn border-none bg-green hover:bg-green text-white hover:text-white hover:opacity-70">
                            Proceed Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
