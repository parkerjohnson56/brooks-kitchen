'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Heart, Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import ProductCarousel from '@/components/ProductCarousel';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/Toast';
import { useState } from 'react';

// Product Card Component for Homepage
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  packSize: string;
}

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
      <div className="relative w-full mb-4 mx-auto rounded-xl overflow-hidden" style={{ aspectRatio: '1/1', minHeight: '300px' }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(1.1)'
          }}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-brown-900 mb-2">{product.name}</h3>
        <p className="text-brown-600 text-sm mb-3 flex-1">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-pink-600 font-bold">${product.price}</span>
          <span className="text-brown-500 text-sm">{product.packSize}</span>
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

export default function Home() {
  const products = [
    {
      id: 1,
      name: 'Blueberry Muffins',
      price: 12,
      description: 'Fresh, fluffy muffins bursting with juicy blueberries',
      image: '/images/product pics/blueberry.png',
      packSize: '4 per pack'
    },
    {
      id: 2,
      name: 'Cinnamon Rolls',
      price: 15,
      description: 'Warm, gooey cinnamon rolls with cream cheese frosting',
      image: '/images/product pics/cinna.png',
      packSize: '4 per pack'
    },
    {
      id: 3,
      name: 'Pumpkin Cinnamon Rolls',
      price: 16,
      description: 'Seasonal favorite with pumpkin spice and warm cinnamon',
      image: '/images/product pics/pumpkin.png',
      packSize: '4 per pack'
    },
    {
      id: 4,
      name: 'Blueberry Scones',
      price: 14,
      description: 'Buttery, crumbly scones with fresh blueberries',
      image: '/images/product pics/scone.png',
      packSize: '4 per pack'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 to-cream py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-brown-900 leading-tight">
                Handmade Baked Goods
                <span className="block text-pink-600 mt-2">Made with Love</span>
              </h1>
              <p className="text-xl lg:text-2xl text-brown-600 leading-relaxed max-w-4xl mx-auto">
                Fresh from our kitchen to your table. Dog lover, pilot, and sugar artist 
                creating delicious treats that bring joy to every bite.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-10 sm:py-5 bg-pink-600 text-white font-semibold text-base sm:text-lg rounded-full hover:bg-pink-700 transition-colors duration-200 group shadow-lg"
              >
                Order Now
                <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-10 sm:py-5 border-2 border-pink-600 text-pink-600 font-semibold text-base sm:text-lg rounded-full hover:bg-pink-600 hover:text-white transition-colors duration-200 shadow-lg"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-row items-center justify-center space-x-4 md:space-x-12 text-brown-600"
            >
              <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-3">
                <Clock className="h-5 w-5 md:h-6 md:w-6 text-pink-600" />
                <span className="text-sm md:text-lg font-medium">3 day lead time</span>
              </div>
              <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-3">
                <Heart className="h-5 w-5 md:h-6 md:w-6 text-pink-600" />
                <span className="text-sm md:text-lg font-medium">Made with love</span>
              </div>
              <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-3">
                <Star className="h-5 w-5 md:h-6 md:w-6 text-pink-600" />
                <span className="text-sm md:text-lg font-medium">Premium quality</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-brown-900">
              About Brook&apos;s Kitchen
            </h2>
            <p className="text-xl text-brown-600 max-w-3xl mx-auto leading-relaxed">
              Dog lover, pilot, and sugar artist creating delicious baked goods that bring 
              warmth and joy to your home. Every treat is handmade with the finest ingredients 
              and a whole lot of love.
            </p>
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12">
              <div className="text-center space-y-2 md:space-y-4">
                <div className="bg-pink-100 w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-5 w-5 md:h-8 md:w-8 text-pink-600" />
                </div>
                <h3 className="text-sm md:text-xl font-semibold text-brown-900">Made with Love</h3>
                <p className="text-xs md:text-base text-brown-600">Every batch is crafted with care and attention to detail</p>
              </div>
              <div className="text-center space-y-2 md:space-y-4">
                <div className="bg-pink-100 w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-5 w-5 md:h-8 md:w-8 text-pink-600" />
                </div>
                <h3 className="text-sm md:text-xl font-semibold text-brown-900">Fresh Daily</h3>
                <p className="text-xs md:text-base text-brown-600">Baked fresh to order with a 3-day lead time</p>
              </div>
              <div className="text-center space-y-2 md:space-y-4">
                <div className="bg-pink-100 w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto">
                  <Star className="h-5 w-5 md:h-8 md:w-8 text-pink-600" />
                </div>
                <h3 className="text-sm md:text-xl font-semibold text-brown-900">Premium Quality</h3>
                <p className="text-xs md:text-base text-brown-600">Only the finest ingredients make it into our kitchen</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-12"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-brown-900 mb-4">
                Our Delicious Treats
              </h2>
              <p className="text-xl text-brown-600 max-w-2xl mx-auto">
                From fluffy muffins to gooey cinnamon rolls, each treat is made with love
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition-colors duration-200 group"
              >
                View All Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Carousel */}
      <ProductCarousel />
    </div>
  );
}
