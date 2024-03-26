import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react';
import { FaPaypal } from "react-icons/fa"
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { useNavigate } from 'react-router-dom';

export default function Checkout({ cart, price }) {
    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState("");

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const [cardError, setCardError] = useState("")
    const [cardMessage, setCardMessage] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if (typeof price !== "number" || price < 1) return
        axiosSecure.post("/payment/stripe", { price })
            .then((res) => setClientSecret(res.data.clientSecret))
            .then((data) => setClientSecret(data.clientSecret))
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) return

        const card = elements.getElement(CardElement)
        if (card == null) return

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) setCardError(error.message)
        else setCardMessage("Successful Transaction.")

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "Anonymous",
                        email: user?.email || "Unknown",
                    }
                },
            })

        if (confirmError) setCardError(confirmError.message)

        if (paymentIntent.status === "succeeded") setCardMessage(`Transaction ID: ${paymentIntent.id}`)

        // payment  info data
        const paymentInfo = {
            email: user.email,
            transactionId: paymentIntent.id,
            price: price,
            quantity: cart.length,
            status: "order pending",
            itemName: cart.map(item => item.name),
            cartItem: cart.map(item => item._id),
            menuItem: cart.map(item => item.menuItemId)
        }

        // send info to backend
        axiosSecure.post("/payment", paymentInfo)
            .then((res) => {
                console.log(res.data)
                alert("Payment Successful.")
                navigate("/order")
            })
    }

    return (
        <div className='flex flex-col items-center justify-center gap-12 min-h-screen sm:py-32'>

            <div className='space-y-3 text-center'>
                <h4 className='text-lg font-bold'>Order Summary</h4>
                <div className='space-y-1'>
                    <p>Number of Items: {cart.length}</p>
                    <p>Total Price: ${price}</p>
                </div>
            </div>

            <div className='w-96 px-4 md:px-0'>
                <div className='card shrink-0 shadow-2xl bg-white px-4 py-8'>
                    <h4 className='text-lg font-bold text-center'>Process your Payment</h4>

                    {/* stripe form */}
                    <form onSubmit={handleSubmit} className='mt-10'>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '17px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />

                        {/* error */}
                        {cardError ? <div className='text-red text-sm mt-4 px-1'>{cardError}</div> : ""}

                        <button
                            type="submit"
                            disabled={!stripe}
                            className='btn btn-primary border-none w-full text-white mt-5'
                        >
                            Pay
                        </button>
                    </form>

                    {/* message */}
                    {cardMessage ? <div className='text-green text-sm mt-4 px-1'>{cardMessage}</div> : ""}

                    {/* paypal */}
                    <div className='mt-6 text-center'>
                        <hr />
                        <button
                            type="submit"
                            disabled={!stripe}
                            className='btn border-none w-full text-white bg-orange-500 mt-6 hover:bg-orange-600'
                        >
                            <FaPaypal />Pay with Paypal
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
