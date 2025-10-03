import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, customerEmail, customerName, orderItems } = await request.json();
    
    // Log the received data for debugging
    console.log('Payment intent request:', { amount, currency, customerEmail, customerName, orderItems });

    // Validate required fields
    if (!amount || !customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, customerEmail, customerName' },
        { status: 400 }
      );
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency || 'usd',
      metadata: {
        customerEmail,
        customerName,
        orderItems: JSON.stringify(orderItems)
      },
      receipt_email: customerEmail,
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      message: 'Payment intent created successfully'
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}

/*
TO SET UP REAL STRIPE PAYMENTS:

1. Install Stripe:
   npm install stripe

2. Add your secret key to .env.local:
   STRIPE_SECRET_KEY=sk_live_your_key_here

3. Replace the simulated code above with:
   import Stripe from 'stripe';
   
   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
   
   const paymentIntent = await stripe.paymentIntents.create({
     amount: amount,
     currency: currency || 'usd',
     metadata: {
       customerEmail,
       customerName,
       orderItems: JSON.stringify(orderItems)
     }
   });
   
   return NextResponse.json({ 
     clientSecret: paymentIntent.client_secret 
   });

4. Set up webhooks to handle payment confirmations
5. Test with small amounts first!
*/
