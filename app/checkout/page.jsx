'use client'
import { Elements } from '@stripe/react-stripe-js'
import React from 'react'
import CheckoutForm from './_components/CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY)
function Checkout() {
  const options = {
    mode: 'payment',
    currency: 'eur',
    amount: 1000,
  }
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  )
}

export default Checkout
