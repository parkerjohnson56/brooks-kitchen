'use client';

import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brown-50 border-t border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-pink-100 p-2 rounded-full">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-brown-900">Brook&apos;s Kitchen</h3>
            </div>
            <p className="text-brown-600 leading-relaxed">
              Handmade baked goods made with love and the finest ingredients. 
              Fresh from our kitchen to your table.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/brookskitchen_/?hl=en" target="_blank" rel="noopener noreferrer" className="text-brown-600 hover:text-pink-600 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/share/1BWZ5rPsWw/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-brown-600 hover:text-pink-600 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-brown-900">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-pink-600" />
                <span className="text-brown-600">brooklynnepley@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-pink-600" />
                <span className="text-brown-600">(515) 745-7270</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-pink-600" />
                <span className="text-brown-600">Local Delivery Area</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-brown-900">Quick Links</h4>
            <div className="space-y-2">
              <a href="/products" className="block text-brown-600 hover:text-pink-600 transition-colors duration-200">
                Our Products
              </a>
              <a href="/about" className="block text-brown-600 hover:text-pink-600 transition-colors duration-200">
                About Us
              </a>
              <a href="/contact" className="block text-brown-600 hover:text-pink-600 transition-colors duration-200">
                Contact
              </a>
              <a href="/policies" className="block text-brown-600 hover:text-pink-600 transition-colors duration-200">
                Policies
              </a>
            </div>
          </motion.div>
        </div>

        {/* Health Food Regulations Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-t border-pink-200 mt-8 pt-6"
        >
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h5 className="text-sm font-semibold text-yellow-800 mb-2">⚠️ Health Food Regulations Notice</h5>
            <p className="text-xs text-yellow-700 leading-relaxed">
              <strong>Made in a residential home kitchen that is not subject to state licensing or inspection.</strong> 
              This product is not intended for resale. We follow proper food safety practices, but please be aware 
              that this is a home-based business operating under cottage food laws.
            </p>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-pink-200 pt-8 text-center"
        >
          <p className="text-brown-600">
            © {currentYear} Brook&apos;s Kitchen. Made with{' '}
            <Heart className="inline h-4 w-4 text-pink-600" /> and love.
          </p>
          <p className="mt-2 text-xs text-brown-500">
            Website made by <a href="https://parkerj.org" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 transition-colors duration-200">Parker Johnson</a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
