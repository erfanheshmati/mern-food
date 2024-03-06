import React, { useEffect, useRef, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from '../../components/Card';
import { } from "react-icons/fa6"
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props
    return (
        <div className={className} style={{ ...style }} onClick={onClick}>
            NEXT
        </div>
    )
}

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props
    return (
        <div className={className} style={{ ...style }} onClick={onClick}>
            BACK
        </div>
    )
}

export default function SpecialDishes() {
    const [recipes, setRecipes] = useState([])
    const slider = useRef(null)

    useEffect(() => {
        fetch("/menu.json")
            .then((res) => res.json())
            .then((data) => {
                const specials = data.filter((item) => item.category === "popular")
                setRecipes(specials)
            })
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className='section-container py-16 bg-white text-secondary relative'>
            <div className='text-left'>
                <p className='subtitle'>Special Dishes</p>
                <h2 className='title w-[320px] md:w-[520px]'>Stand Out Dishes from Our Menu</h2>
            </div>

            {/* arrow btn */}
            <div className='md:absolute right-3 top-36 mb-10 mr-3 lg:mr-2 xl:mr-24'>
                <button onClick={() => slider?.current?.slickPrev()} className='btn border-none text-secondary p-2 rounded-full ml-5 bg-gray-200 hover:bg-gray-200 hover:text-secondary hover:opacity-70'>
                    <FaAngleLeft className='w-8 h-8 p-1' />
                </button>
                <button onClick={() => slider?.current?.slickNext()} className='btn border-none text-secondary p-2 rounded-full ml-5 bg-green hover:bg-green hover:text-secondary hover:opacity-70'>
                    <FaAngleRight className='w-8 h-8 p-1' />
                </button>
            </div>

            {/* slider */}
            <Slider ref={slider} {...settings}>
                {recipes.map((item, index) => (
                    <Card key={index} item={item} />
                ))}
            </Slider>
        </div>
    )
}
