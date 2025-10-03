'use client';

import { motion } from 'framer-motion';
import { Heart, Clock, Star, Plane, Dog, Palette } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pink-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 to-cream py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-brown-900">
              About Brook's Kitchen
            </h1>
            <p className="text-xl text-brown-600 max-w-3xl mx-auto leading-relaxed">
              Dog lover, pilot, and sugar artist creating delicious baked goods that bring 
              warmth and joy to your home. Every treat is handmade with the finest ingredients 
              and a whole lot of love.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-brown-900">
                My Story
              </h2>
              <div className="space-y-4 text-brown-600 leading-relaxed">
                <p>
                  Hi, I'm Brook! I'm a dog lover, pilot, and sugar artist who discovered my passion 
                  for baking during my travels. What started as a hobby to bring comfort to friends 
                  and family has grown into something truly special.
                </p>
                <p>
                  When I'm not flying high in the sky or spending time with my furry friends, 
                  you'll find me in the kitchen creating delicious treats. Each recipe is crafted 
                  with love, using only the finest ingredients and traditional techniques passed 
                  down through generations.
                </p>
                <p>
                  My goal is simple: to bring joy to your day with every bite. Whether it's a 
                  warm cinnamon roll on a chilly morning or a fresh blueberry muffin for your 
                  afternoon coffee, I want each treat to feel like a hug from home.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-pink-100 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6">
                  <div className="aspect-square bg-pink-50 rounded-xl overflow-hidden">
                    <Image
                      src="/images/about.JPG"
                      alt="Brook - Owner of Brook's Kitchen"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
                What I Believe In
              </h2>
              <p className="text-xl text-brown-600 max-w-2xl mx-auto">
                These core values guide everything I do in the kitchen
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-brown-900">Made with Love</h3>
                <p className="text-brown-600">
                  Every batch is crafted with care and attention to detail. 
                  I believe that love is the secret ingredient that makes everything taste better.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Star className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-brown-900">Premium Quality</h3>
                <p className="text-brown-600">
                  Only the finest ingredients make it into my kitchen. 
                  I source locally when possible and never compromise on quality.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-brown-900">Fresh Daily</h3>
                <p className="text-brown-600">
                  Everything is baked fresh to order with a 3-day lead time. 
                  No preservatives, no shortcuts, just pure deliciousness.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-20 bg-warm-white">
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
                Fun Facts About Me
              </h2>
              <p className="text-xl text-brown-600 max-w-2xl mx-auto">
                A few things that make me who I am
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-pink-50 rounded-2xl p-6 text-center"
              >
                <Dog className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-brown-900 mb-2">Dog Lover</h3>
                <p className="text-brown-600 text-sm">
                  I have a soft spot for all furry friends and often bake special treats for my four-legged companions.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-pink-50 rounded-2xl p-6 text-center"
              >
                <Plane className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-brown-900 mb-2">Pilot</h3>
                <p className="text-brown-600 text-sm">
                  When I'm not in the kitchen, you'll find me soaring through the skies, 
                  bringing the same precision and care to flying as I do to baking.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-pink-50 rounded-2xl p-6 text-center"
              >
                <Palette className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-brown-900 mb-2">Sugar Artist</h3>
                <p className="text-brown-600 text-sm">
                  I love creating beautiful, edible art. Each treat is not just delicious 
                  but also a work of art that brings joy to your day.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-brown-900">
              Ready to Taste the Love?
            </h2>
            <p className="text-xl text-brown-600">
              Order your favorite treats today and experience the difference that love makes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition-colors duration-200"
              >
                Order Now
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-pink-600 text-pink-600 font-semibold rounded-full hover:bg-pink-600 hover:text-white transition-colors duration-200"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
