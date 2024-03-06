import React from 'react'

const servicesList = [
    { id: 1, title: "Catering", desc: "Delight your guests with our flavors and  presentation", image: "/images/home/services/icon1.png" },
    { id: 2, title: "Fast Delivery", desc: "We deliver your order promptly to your door", image: "/images/home/services/icon2.png" },
    { id: 3, title: "Online Ordering", desc: "Explore menu & using our Online Ordering ", image: "/images/home/services/icon3.png" },
    { id: 4, title: "Gift Cards", desc: "Give the gift of exceptional dining with Foodi Gift Cards", image: "/images/home/services/icon4.png" },
]

export default function Services() {
    return (
        <div className='section-container py-20 bg-white text-secondary'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
                {/* text */}
                <div className='md:w-1/2'>
                    <div className='text-left md:w-4/5'>
                        <p className='subtitle'>Our Story & Services</p>
                        <h2 className='title'>Our Culinary Journey And Services</h2>
                        <p className='my-5'>
                            Rooted in passion, we curate unforgettable dining experiences and offer exceptional services, blending culinary artistry with warm hospitality.
                        </p>
                        <button className='btn border-none bg-green rounded-full px-8 text-white hover:bg-green hover:text-white hover:opacity-70'>
                            Explore
                        </button>
                    </div>
                </div>
                {/* image */}
                <div className='md:w-1/2'>
                    <div className='grid sm:grid-cols-2 grid-cols-1 gap-8 items-center'>
                        {servicesList.map((service) => (
                            <div key={service.id} className='h-60 shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border hover:border-indigo-300 transition-all duration-300'>
                                <img src={service.image} alt={service.title} className='mx-auto' />
                                <h5 className='pt-3 font-semibold'>{service.title}</h5>
                                <p className='text-[#90BD95]'>{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
