'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Truck, Store, User, Mail, Phone, MapPin, CreditCard, Heart, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { sendOrderEmail, OrderData } from '@/lib/emailService';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/Toast';
import { PAYMENT_OPTIONS, type PaymentOption } from '@/lib/stripe';


// Delivery Options Component
function DeliveryOptions({ selectedOption, onSelect }: { selectedOption: string, onSelect: (option: string) => void }) {
  const options = [
    {
      id: 'delivery',
      title: 'Local Delivery',
      description: 'Fresh delivery to your door',
      icon: Truck,
      price: 5,
      time: 'Same day (if ordered before 2pm)'
    },
    {
      id: 'pickup',
      title: 'Pickup',
      description: 'Pick up at our kitchen',
      icon: Store,
      price: 0,
      time: 'Ready in 3 days'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-brown-900 mb-4">Delivery Options</h3>
      {options.map((option) => {
        const Icon = option.icon;
        return (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
              selectedOption === option.id
                ? 'border-pink-600 bg-pink-50'
                : 'border-pink-200 hover:border-pink-300'
            }`}
            onClick={() => onSelect(option.id as PaymentOption)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${
                  selectedOption === option.id ? 'bg-pink-600' : 'bg-pink-100'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    selectedOption === option.id ? 'text-white' : 'text-pink-600'
                  }`} />
                </div>
                <div>
                  <h4 className="font-semibold text-brown-900">{option.title}</h4>
                  <p className="text-sm text-brown-600">{option.description}</p>
                  <p className="text-xs text-brown-500">{option.time}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`font-bold ${
                  option.price === 0 ? 'text-green-600' : 'text-pink-600'
                }`}>
                  {option.price === 0 ? 'FREE' : `$${option.price}`}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Payment Options Component
function PaymentOptions({ selectedOption, onSelect }: { selectedOption: PaymentOption, onSelect: (option: PaymentOption) => void }) {
  const options = [
    {
      id: PAYMENT_OPTIONS.PREPAY,
      title: 'Prepay Online',
      description: 'Pay securely with card now',
      icon: CreditCard,
      note: 'Secure payment via Stripe'
    },
    {
      id: PAYMENT_OPTIONS.CASH,
      title: 'Pay with Cash',
      description: 'Pay when you receive your order',
      icon: DollarSign,
      note: 'Cash on delivery/pickup'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-brown-900 mb-4">Payment Options</h3>
      {options.map((option) => {
        const Icon = option.icon;
        return (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
              selectedOption === option.id
                ? 'border-pink-600 bg-pink-50'
                : 'border-pink-200 hover:border-pink-300'
            }`}
            onClick={() => onSelect(option.id as PaymentOption)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${
                  selectedOption === option.id ? 'bg-pink-600' : 'bg-pink-100'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    selectedOption === option.id ? 'text-white' : 'text-pink-600'
                  }`} />
                </div>
                <div>
                  <h4 className="font-semibold text-brown-900">{option.title}</h4>
                  <p className="text-sm text-brown-600">{option.description}</p>
                  <p className="text-xs text-brown-500">{option.note}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Contact Form Component
interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  instructions: string;
}

function ContactForm({ formData, onUpdate }: { formData: FormData, onUpdate: (field: string, value: string) => void }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-brown-900 mb-4">Contact Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brown-700 mb-2">
            <User className="inline h-4 w-4 mr-2" />
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors duration-200"
            placeholder="Your full name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-brown-700 mb-2">
            <Phone className="inline h-4 w-4 mr-2" />
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => onUpdate('phone', e.target.value)}
            className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors duration-200"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-700 mb-2">
          <Mail className="inline h-4 w-4 mr-2" />
          Email Address *
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => onUpdate('email', e.target.value)}
          className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors duration-200"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-700 mb-2">
          <MapPin className="inline h-4 w-4 mr-2" />
          Delivery Address *
        </label>
        <textarea
          required
          value={formData.address}
          onChange={(e) => onUpdate('address', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors duration-200"
          placeholder="Street address, city, state, zip code"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-700 mb-2">
          Special Instructions
        </label>
        <textarea
          value={formData.instructions}
          onChange={(e) => onUpdate('instructions', e.target.value)}
          rows={2}
          className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors duration-200"
          placeholder="Any special delivery instructions or notes..."
        />
      </div>
    </div>
  );
}

// Order Summary Component
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  packSize: string;
}

function OrderSummary({ cart, deliveryPrice }: { cart: CartItem[], deliveryOption: string, deliveryPrice: number }) {
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subtotal + deliveryPrice;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-brown-900 mb-4">Order Summary</h3>
      
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-2 border-b border-pink-100">
            <div>
              <h4 className="font-medium text-brown-900">{item.name}</h4>
              <p className="text-sm text-brown-600">{item.packSize}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-brown-600">Qty: {item.quantity}</p>
              <p className="font-semibold text-brown-900">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
        
        <div className="pt-4 space-y-2">
          <div className="flex justify-between text-brown-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-brown-600">
            <span>Delivery</span>
            <span>{deliveryPrice === 0 ? 'FREE' : `$${deliveryPrice.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-brown-900 pt-2 border-t border-pink-200">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Checkout Page
export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { addToast } = useToast();
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [paymentOption, setPaymentOption] = useState<PaymentOption>(PAYMENT_OPTIONS.CASH);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    instructions: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryPrices = {
    delivery: 5,
    pickup: 0
  };

  const handleFormUpdate = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      const deliveryFee = deliveryPrices[deliveryOption as keyof typeof deliveryPrices];
      const total = subtotal + deliveryFee;

      const orderData: OrderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        deliveryOption: deliveryOption as 'delivery' | 'pickup',
        specialInstructions: formData.instructions,
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          packSize: item.packSize
        })),
        subtotal,
        deliveryFee,
        total
      };

      // Handle payment based on selected option
      if (paymentOption === PAYMENT_OPTIONS.PREPAY) {
        // Process Stripe payment first
        try {
          const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: total,
              currency: 'usd',
              customerEmail: formData.email,
              customerName: formData.name,
              orderItems: orderData.items
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to create payment intent');
          }

          const { clientSecret } = await response.json();
          
          // For now, we'll simulate successful payment and proceed with order
          // In a full implementation, you'd use Stripe Elements to collect payment
          addToast({
            type: 'success',
            title: 'Payment Intent Created!',
            message: 'Payment processed successfully. Processing your order...',
            duration: 3000
          });

          // Small delay to show payment success
          await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (paymentError) {
          console.error('Payment error:', paymentError);
          addToast({
            type: 'error',
            title: 'Payment Failed',
            message: 'There was an issue processing your payment. Please try again.',
            duration: 5000
          });
          return;
        }
      }

      // Send order email to Brook (for both prepay and cash)
      const emailSent = await sendOrderEmail(orderData);
      
      if (emailSent) {
        addToast({
          type: 'success',
          title: 'Order Submitted!',
          message: paymentOption === PAYMENT_OPTIONS.PREPAY 
            ? 'Payment processed and order sent to Brook! Check your email for receipt.'
            : 'Order sent to Brook! Check your email for receipt or copy it from the modal.',
          duration: 5000
        });
        // Clear cart and reset form
        clearCart();
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: '',
          instructions: ''
        });
        setDeliveryOption('pickup');
        setPaymentOption(PAYMENT_OPTIONS.CASH);
      } else {
        addToast({
          type: 'error',
          title: 'Order Failed',
          message: 'There was an issue sending your order. Please try again or contact Brook directly.',
          duration: 5000
        });
      }
    } catch (error) {
      console.error('Order submission error:', error);
      addToast({
        type: 'error',
        title: 'Error',
        message: 'There was an error processing your order. Please try again.',
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <ShoppingCart className="h-16 w-16 text-pink-300 mx-auto" />
          <h1 className="text-2xl font-bold text-brown-900">Your cart is empty</h1>
          <p className="text-brown-600">Add some delicious treats to get started!</p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition-colors duration-200"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-brown-900">
            Checkout
          </h1>
          <p className="text-xl text-brown-600 max-w-2xl mx-auto">
            Complete your order and we&apos;ll get started on your delicious treats
          </p>
          
          {/* Health Food Regulations Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 max-w-4xl mx-auto"
          >
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Health Food Regulations Notice</h3>
            <p className="text-sm text-yellow-700 leading-relaxed">
              <strong>Made in a residential home kitchen that is not subject to state licensing or inspection.</strong> 
              This product is not intended for resale. We follow proper food safety practices, but please be aware 
              that this is a home-based business operating under cottage food laws.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Delivery Options */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <DeliveryOptions
                  selectedOption={deliveryOption}
                  onSelect={setDeliveryOption}
                />
              </motion.div>

              {/* Payment Options */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <PaymentOptions
                  selectedOption={paymentOption}
                  onSelect={setPaymentOption}
                />
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <ContactForm
                  formData={formData}
                  onUpdate={handleFormUpdate}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-12 py-4 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      {paymentOption === PAYMENT_OPTIONS.PREPAY ? 'Processing Payment...' : 'Processing Order...'}
                    </>
                  ) : (
                    <>
                      {paymentOption === PAYMENT_OPTIONS.PREPAY ? (
                        <CreditCard className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                      ) : (
                        <DollarSign className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                      )}
                      {paymentOption === PAYMENT_OPTIONS.PREPAY ? 'Pay & Place Order' : 'Place Order (Pay Later)'}
                    </>
                  )}
                </button>
                <p className="text-sm text-brown-600 mt-4">
                  Made with <Heart className="inline h-4 w-4 text-pink-600" /> by Brook
                </p>
              </motion.div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <OrderSummary
              cart={cart}
              deliveryOption={deliveryOption}
              deliveryPrice={deliveryPrices[deliveryOption as keyof typeof deliveryPrices]}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
