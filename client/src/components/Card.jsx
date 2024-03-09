import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaHeart } from "react-icons/fa"
import { AuthContext } from '../contexts/AuthProvider'
import Swal from "sweetalert2"
import useCart from '../hooks/useCart'

export default function Card({ item }) {
    const [isLiked, setIsLiked] = useState(false)

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()

    const [cart, refetch] = useCart()

    const handleLike = () => {
        setIsLiked(!isLiked)
    }

    const handleAddToCart = (item) => {
        if (user && user?.email) {
            const cartItem = { menuItemId: item._id, name: item.name, quantity: 1, image: item.image, price: item.price, email: user.email }
            fetch("http://localhost:5000/cart", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch()
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "The product added to your cart successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
        else {
            Swal.fire({
                title: "Please create an account or login",
                text: "Without an account can't be able to add products!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Signup"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/signup", { state: { from: location } })
                }
            });
        }
    }

    return (
        <div className="card w-80 lg:w-96 shadow-xl relative mt-5 mb-8 lg:my-10 mx-5 bg-white">
            <div className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${isLiked ? "text-rose-500" : "text-white"}`} onClick={handleLike}>
                <FaHeart className='h-5 w-5 cursor-pointer' />
            </div>
            <Link to={`/menu/${item._id}`}>
                <figure>
                    <img src={item.image} alt="" className='hover:scale-105 transition-all duration-300 md:h-72' />
                </figure>
            </Link>
            <div className="card-body">
                <Link to={`/menu/${item._id}`}>
                    <h2 className="card-title">{item.name}</h2>
                </Link>
                <p>{item.recipe}</p>
                <div className="card-actions justify-between items-center mt-2">
                    <h5 className='font-semibold'><span className='text-red'>$</span>{item.price}</h5>
                    <button
                        className="btn border-none bg-green hover:bg-green text-white hover:text-white hover:opacity-70"
                        onClick={() => handleAddToCart(item)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
