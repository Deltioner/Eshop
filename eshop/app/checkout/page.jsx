'use client'
import React, { Suspense } from 'react' // Import Suspense
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './_components/CheckoutForm'
import { useSearchParams } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

// 1. Move the Stripe and SearchParams logic into a sub-component
function CheckoutContent() {
    const searchParams = useSearchParams();
    const rawAmount = Number(searchParams.get('amount')) || 0;

    const options = {
        mode: 'payment',
        currency: 'eur',
        amount: Math.round(rawAmount * 100)
    }

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm amount={rawAmount} />
        </Elements>
    )
}

// 2. The main exported component wraps everything in Suspense
function Checkout() {
    return (
        // The fallback is what shows while Next.js is reading the URL
        <Suspense fallback={<div className="flex justify-center p-10">Loading Payment Details...</div>}>
            <CheckoutContent />
        </Suspense>
    )
}

export default Checkout;