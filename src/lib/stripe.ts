// Stripe configuration and payment handling
// You'll need to add your Stripe API keys here

export interface PaymentData {
  amount: number; // in cents
  currency: string;
  customerEmail: string;
  customerName: string;
  orderItems: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

// Stripe configuration
export const STRIPE_CONFIG = {
  // Replace with your actual Stripe publishable key
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here',
  // This will be used for server-side operations
  secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_your_key_here',
};

// Payment options
export const PAYMENT_OPTIONS = {
  PREPAY: 'prepay',
  CASH: 'cash',
} as const;

export type PaymentOption = typeof PAYMENT_OPTIONS[keyof typeof PAYMENT_OPTIONS];

// Function to create Stripe payment intent (for prepay option)
export const createPaymentIntent = async (paymentData: PaymentData) => {
  try {
    // This would typically call your backend API
    // For now, we'll simulate the payment process
    
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const { clientSecret } = await response.json();
    return clientSecret;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Function to process cash payment (just confirmation)
export const processCashPayment = async (paymentData: PaymentData) => {
  // For cash payments, we just need to confirm the order
  // The actual payment happens when Brook delivers/picks up
  console.log('Processing cash payment for:', paymentData.customerName);
  return {
    success: true,
    paymentMethod: 'cash',
    message: 'Cash payment confirmed. Pay when you receive your order.',
  };
};

// Stripe setup instructions:
/*
TO SET UP STRIPE PROPERLY:

1. Go to https://dashboard.stripe.com/
2. Make sure you're in LIVE mode (not test mode)
3. Get your API keys:
   - Publishable key (starts with pk_live_)
   - Secret key (starts with sk_live_)

4. Add these to your environment variables:
   - Create a .env.local file in your project root
   - Add: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
   - Add: STRIPE_SECRET_KEY=sk_live_your_key_here

5. For production, you'll need a backend API endpoint at /api/create-payment-intent
   This endpoint should:
   - Create a Stripe PaymentIntent
   - Return the client_secret
   - Handle webhooks for payment confirmation

6. Test with small amounts first!

SANDBOX vs LIVE MODE:
- Sandbox (test) mode: Use pk_test_ and sk_test_ keys
- Live mode: Use pk_live_ and sk_live_ keys
- Live mode processes real payments and charges real fees
*/
