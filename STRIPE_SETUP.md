# Stripe Setup for Vercel Deployment

## Environment Variables Needed

You need to add these environment variables to your Vercel project:

### 1. Stripe Keys (Required)

**For Testing:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_test_secret_key_here
```

**For Production:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key_here
STRIPE_SECRET_KEY=sk_live_your_live_secret_key_here
```

## How to Get Your Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Click on "Developers" → "API keys"
3. Copy your keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

## How to Add to Vercel

1. Go to your Vercel project dashboard
2. Click on "Settings" → "Environment Variables"
3. Add each variable:
   - Name: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Value: `pk_test_...` (your actual key)
   - Environment: Production, Preview, Development
4. Add the secret key:
   - Name: `STRIPE_SECRET_KEY`
   - Value: `sk_test_...` (your actual key)
   - Environment: Production, Preview, Development

## Testing vs Production

- **Test keys** (`pk_test_`, `sk_test_`): Use for development and testing
- **Live keys** (`pk_live_`, `sk_live_`): Use for real payments (charges real money!)

## Current Status

✅ Stripe package added to dependencies
✅ API route updated to use real Stripe
✅ Environment variables configured
✅ Ready for Vercel deployment

## Next Steps

1. Get your Stripe keys from the dashboard
2. Add them to Vercel environment variables
3. Deploy to Vercel
4. Test with small amounts first!

## Important Notes

- Always test with small amounts first
- The secret key should NEVER be exposed in client-side code
- Use test keys during development
- Switch to live keys only when ready for production
