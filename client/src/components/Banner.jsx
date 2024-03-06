import React from 'react'

export default function Banner() {
    return (
        <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
            <div className='py-20 flex flex-col md:flex-row-reverse justify-between items-center gap-8'>
                {/* image */}
                <div className='md:w-1/2 px-4'>
                    <img src="/images/home/banner.png" alt="" />
                    <div className='flex flex-col md:flex-row items-center justify-around -mt-14 gap-4'>
                        {/* tooltip 1 */}
                        <div className='flex bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-72'>
                            <img src="/images/home/b-food1.png" alt="" className='rounded-2xl' />
                            <div className='space-y-1'>
                                <h5 className='font-medium mb-1'>Spicy noodles</h5>
                                <div className="rating rating-sm">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" checked readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" readOnly />
                                </div>
                                <p className='text-red'>$18.00</p>
                            </div>
                        </div>
                        {/* tooltip 2 */}
                        <div className='hidden lg:flex bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-72'>
                            <img src="/images/home/b-food1.png" alt="" className='rounded-2xl' />
                            <div className='space-y-1'>
                                <h5 className='font-medium mb-1'>Vegetables salad</h5>
                                <div className="rating rating-sm">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" checked readOnly />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" readOnly />
                                </div>
                                <p className='text-red'>$22.00</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* text */}
                <div className='md:w-1/2 space-y-7 text-secondary'>
                    <h2 className='text-4xl md:text-5xl font-bold leading-snug md:leading-tight'>
                        Dive into Delights
                        <br />of Delectable <span className='text-green'>Food</span>
                    </h2>
                    <p className='text-xl text-[#4A4A4A]'>
                        Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship
                    </p>
                    <button className='btn border-none rounded-full bg-green hover:bg-green px-7 py-3 font-semibold text-white hover:text-white hover:opacity-70 cursor-pointer'>Order Now</button>
                </div>
            </div>
        </div>
    )
}
