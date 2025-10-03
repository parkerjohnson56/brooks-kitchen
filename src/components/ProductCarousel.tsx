'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ProductCarousel() {
  // Actual carousel images from the carousel folder
  const carouselImages = [
    {
      id: 1,
      src: '/images/carousel/IMG_6389.JPG',
      alt: 'Fresh baked goods display'
    },
    {
      id: 2,
      src: '/images/carousel/IMG_6348.JPG',
      alt: 'Cinnamon rolls close up'
    },
    {
      id: 3,
      src: '/images/carousel/IMG_6347.JPG',
      alt: 'Blueberry muffins display'
    },
    {
      id: 4,
      src: '/images/carousel/IMG_6342.JPEG',
      alt: 'Scones and pastries'
    },
    {
      id: 5,
      src: '/images/carousel/IMG_6338.JPG',
      alt: 'Kitchen workspace'
    },
    {
      id: 6,
      src: '/images/carousel/IMG_6335.JPG',
      alt: 'Baking process'
    },
    {
      id: 7,
      src: '/images/carousel/3198248975845080304.JPG',
      alt: 'Delicious treats'
    },
    {
      id: 8,
      src: '/images/carousel/IMG_6733.JPG',
      alt: 'Fresh baked goods'
    },
    {
      id: 9,
      src: '/images/carousel/IMG_6248.JPEG',
      alt: 'Beautiful presentation'
    },
    {
      id: 10,
      src: '/images/carousel/IMG_6220.JPEG',
      alt: 'Kitchen magic'
    },
    {
      id: 11,
      src: '/images/carousel/IMG_6216.JPEG',
      alt: 'Homemade goodness'
    }
  ];

  // Duplicate images for seamless loop
  const duplicatedImages = [...carouselImages, ...carouselImages];

  return (
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
              Behind the Scenes
            </h2>
            <p className="text-xl text-brown-600 max-w-2xl mx-auto">
              Take a peek into our kitchen and see the love that goes into every batch
            </p>
          </div>

          {/* Flowing Banner */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex space-x-4"
              animate={{
                x: [0, -50 * carouselImages.length]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {duplicatedImages.map((image, index) => (
                <div
                  key={`${image.id}-${index}`}
                  className="flex-shrink-0 w-48 h-48 rounded-2xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
