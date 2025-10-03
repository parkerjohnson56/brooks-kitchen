'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/Toast';

// Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  packSize: string;
}

// Product Card Component
function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        packSize: product.packSize,
        image: product.image
      });
    }
    setQuantity(1);
    addToast({
      type: 'success',
      title: 'Added to Cart!',
      message: `${quantity} x ${product.name} added to your cart`,
      duration: 3000
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
    >
      <div className="w-64 h-64 mb-4 mx-auto">
        <Image
          src={product.image}
          alt={product.name}
          width={256}
          height={256}
          className="w-full h-full object-cover rounded-xl"
          style={{ 
            objectPosition: 'center'
          }}
        />
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-brown-900 mb-2">{product.name}</h3>
          <p className="text-brown-600 text-sm mb-3">{product.description}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-pink-600">${product.price}</span>
            <span className="text-brown-500 text-sm">{product.packSize}</span>
          </div>
        </div>

        <div className="space-y-3 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-brown-700">Quantity:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors duration-200"
              >
                <Minus className="h-4 w-4 text-pink-600" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors duration-200"
              >
                <Plus className="h-4 w-4 text-pink-600" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center space-x-2 bg-pink-600 text-white font-semibold py-3 rounded-full hover:bg-pink-700 transition-colors duration-200 group"
          >
            <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}


// Main Products Page
export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: 'Blueberry Muffins',
      price: 12,
      description: 'Fresh, fluffy muffins bursting with juicy blueberries. Perfect for breakfast or a sweet afternoon treat.',
      image: '/images/muffin.png',
      packSize: '4 per pack'
    },
    {
      id: 2,
      name: 'Cinnamon Rolls',
      price: 15,
      description: 'Warm, gooey cinnamon rolls with cream cheese frosting. A classic favorite that never disappoints.',
      image: '/images/cinnamon.png',
      packSize: '4 per pack'
    },
    {
      id: 3,
      name: 'Pumpkin Cinnamon Rolls',
      price: 16,
      description: 'Seasonal favorite with pumpkin spice and warm cinnamon. Perfect for fall and winter months.',
      image: '/images/pumpkin.png',
      packSize: '4 per pack'
    },
    {
      id: 4,
      name: 'Blueberry Scones',
      price: 14,
      description: 'Buttery, crumbly scones with fresh blueberries. Great with tea or coffee.',
      image: '/images/scones.png',
      packSize: '4 per pack'
    }
  ];

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
            Our Delicious Treats
          </h1>
          <p className="text-xl text-brown-600 max-w-2xl mx-auto">
            Handmade with love and the finest ingredients. Each treat is crafted to bring joy to your day.
          </p>
          
          {/* Flavor Request Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-pink-50 border border-pink-200 rounded-2xl p-6 max-w-4xl mx-auto"
          >
            <h3 className="text-lg font-semibold text-brown-900 mb-2">Want a Different Flavor?</h3>
            <p className="text-brown-600">
              Don't see your favorite flavor? No problem! Just add a note in your order message 
              and we'll do our best to accommodate your request. We love creating custom treats!
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 space-y-6"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Heart className="h-8 w-8 text-pink-600" />
              <h2 className="text-2xl font-bold text-brown-900">Made with Love</h2>
            </div>
            <p className="text-brown-600 max-w-2xl mx-auto">
              Every batch is carefully crafted with attention to detail and the finest ingredients. 
              We believe that good food brings people together and creates lasting memories.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
