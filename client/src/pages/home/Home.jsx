import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import SpecialDishes from './SpecialDishes'
import Testimonials from './Testimonials'
import Services from './Services'

export default function Home() {
    return (
        <>
            <Banner />
            <Categories />
            <SpecialDishes />
            <Testimonials />
            <Services />
        </>
    )
}
