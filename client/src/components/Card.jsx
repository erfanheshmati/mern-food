import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { FaHeart } from "react-icons/fa"

export default function Card({ item }) {
    const [isLiked, setIsLiked] = useState(false)

    const handleLike = () => {
        setIsLiked(!isLiked)
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
                    <button className="btn border-none bg-green hover:bg-green text-white hover:text-white hover:opacity-70">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}
