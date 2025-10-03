'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X, CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export default function CartModal() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-brown-900">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-pink-50 rounded-full transition-colors duration-200"
                >
                  <X className="h-6 w-6 text-brown-600" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <ShoppingCart className="h-16 w-16 text-pink-300 mx-auto" />
                    <p className="text-brown-600">Your cart is empty</p>
                    <p className="text-sm text-brown-500">Add some delicious treats!</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-pink-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-brown-900">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-pink-600 hover:text-pink-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-brown-600 mb-2">{item.packSize}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded-full bg-white hover:bg-pink-100 transition-colors duration-200"
                            >
                              <Minus className="h-4 w-4 text-pink-600" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-full bg-white hover:bg-pink-100 transition-colors duration-200"
                            >
                              <Plus className="h-4 w-4 text-pink-600" />
                            </button>
                          </div>
                          <span className="font-bold text-pink-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-pink-200 pt-4 space-y-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-pink-600">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full flex items-center justify-center space-x-2 bg-pink-600 text-white font-semibold py-3 rounded-full hover:bg-pink-700 transition-colors duration-200"
                    >
                      <CreditCard className="h-5 w-5" />
                      <span>Checkout</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
