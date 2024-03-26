import React from 'react'
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./Checkout"
import { loadStripe } from '@stripe/stripe-js'
import useCart from "../../hooks/useCart"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export default function Payment() {
    const [cart] = useCart()

    // checkout total price calculation
    const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)
    const totalPrice = parseFloat(cartTotal.toFixed(2))

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm cart={cart} price={totalPrice} />
            </Elements>
        </div>
    )
}
