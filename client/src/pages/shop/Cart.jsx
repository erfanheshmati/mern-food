import React, { useState } from 'react'
import { Link } from "react-router-dom"
import useCart from '../../hooks/useCart'
import { FaTrash } from "react-icons/fa"
import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth'
import axios from 'axios'

export default function Cart() {
    const [cart, refetch] = useCart()

    const { user } = useAuth()

    const [cartItems, setCartItems] = useState([])

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
                axios.delete(`http://localhost:5000/cart/${item._id}`)
                    .then((response) => {
                        if (response) {
                            refetch()
                            Swal.fire(
                                "Successfully Done",
                                "Your item has been deleted",
                                "success"
                            )
                        }
                    })
            }
        });
    }

    const handleIncrease = (item) => {
        fetch(`http://localhost:5000/cart/${item._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ quantity: item.quantity + 1 })
        })
            .then((res) => res.json())
            .then((data) => {
                const updatedCart = cartItems.map((cartItem) => {
                    if (cartItem.id === item.id) {
                        return { ...cartItem, quantity: cartItem.quantity + 1 }
                    }
                    return cartItem
                })
                refetch()
                setCartItems(updatedCart)
            })
        refetch()
    }


    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            fetch(`http://localhost:5000/cart/${item._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({ quantity: item.quantity - 1 })
            })
                .then((res) => res.json())
                .then((data) => {
                    const updatedCart = cartItems.map((cartItem) => {
                        if (cartItem.id === item.id) {
                            return { ...cartItem, quantity: cartItem.quantity - 1 }
                        }
                        return cartItem
                    })
                    refetch()
                    setCartItems(updatedCart)
                })
            refetch()
        }
        else {
            handleDelete(item)
        }
    }

    const calculatePrice = (item) => {
        return item.price * item.quantity
    }

    const cartSubTotal = cart.reduce((total, item) => {
        return total + calculatePrice(item)
    }, 0)

    return (
        <div className={`section-container min-h-screen bg-white ${cart.length === 0 ? "flex items-center justify-center" : "py-28"}`} >

            {/* empty cart */}
            {cart.length === 0 ? (
                <div className='flex flex-col items-center justify-center'>
                    <img src="/images/cart/cart-empty.png" alt="" />
                    <Link to="/menu">
                        <button className="btn border-none bg-green hover:bg-green text-white hover:text-white hover:opacity-70">
                            Back to Menu
                        </button>
                    </Link>
                </div>
            ) : null
            }

            < div className={`${cart.length === 0 ? "hidden" : ""}`}>
                {/* banner */}
                <div className="py-10 lg:pt-10 lg:pb-20 flex flex-col items-center justify-center">
                    {/* content */}
                    <div className=" text-center px-4 space-y-7">
                        <h2 className="text-3xl md:text-5xl font-bold">
                            Items Added to The<span className="text-green"> Cart</span>
                        </h2>
                    </div>
                </div>
                {/* cart items */}
                < div className="overflow-x-auto rounded-md">
                    {/* cart table */}
                    < table className="table" >
                        {/* head */}
                        < thead className='bg-green text-white' >
                            <tr className='border-none'>
                                <th>#</th>
                                <th>Food</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Delete</th>
                            </tr>
                        </thead >
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
                                    <td>
                                        <div className='flex'>
                                            <button
                                                className='btn btn-xs border-none bg-gray-200 text-secondary hover:bg-gray-300'
                                                onClick={() => handleDecrease(item)}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className='bg-white w-10 text-center overflow-hidden appearance-none'
                                                value={item.quantity}
                                                onChange={() => console.log(item.quantity)}
                                            />
                                            <button
                                                className='btn btn-xs border-none bg-gray-200 text-secondary hover:bg-gray-300'
                                                onClick={() => handleIncrease(item)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td>${calculatePrice(item).toFixed(2)}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-sm text-red" onClick={() => handleDelete(item)}>
                                            <FaTrash />
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table >
                </div >
                {/* customer details */}
                < div className='my-12 flex flex-col md:flex-row justify-between items-start gap-6' >
                    <div className='lg:w-1/2 space-y-2'>
                        <h3 className='font-bold'>Customer Details</h3>
                        <p>Name: {user.displayName}</p>
                        <p>Email: {user.email}</p>
                    </div>
                    <div className='lg:w-1/2 space-y-2'>
                        <h3 className='font-bold'>Shopping Details</h3>
                        <p>Total Items: {cart.length}</p>
                        <p>Total Price: ${cartSubTotal.toFixed(2)}</p>

                    </div>
                    <div className=''>
                        <Link to="/process-checkout">
                            <button className="btn border-none bg-green hover:bg-green text-white hover:text-white hover:opacity-70 leading-4">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </div >
            </div >
        </div >
    )
}
