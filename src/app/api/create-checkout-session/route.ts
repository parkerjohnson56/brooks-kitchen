import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: NextRequest) {
  try {
    const { 
      amount, 
      currency, 
      customerEmail, 
      customerName, 
      orderItems,
      successUrl,
      cancelUrl 
    } = await request.json();

    // Validate required fields
    if (!amount || !customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, customerEmail, customerName' },
        { status: 400 }
      );
    }

    // Create line items for Stripe Checkout
    const lineItems = orderItems.map((item: any) => ({
      price_data: {
        currency: currency || 'usd',
        product_data: {
          name: item.name,
          description: `${item.packSize} - ${item.quantity} ${item.quantity > 1 ? 'packs' : 'pack'}`,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerEmail,
      metadata: {
        customerName,
        customerEmail,
        orderItems: JSON.stringify(orderItems),
      },
      success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?payment=success`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?payment=cancelled`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
    });

    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id 
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
