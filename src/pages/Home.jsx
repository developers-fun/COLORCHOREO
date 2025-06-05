import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ShapePreview from '../components/ShapePreview';

function Home() {
  const defaultSettings = {
    type: 'wave',
    duration: 2,
    amplitude: 20,
    ease: 'easeInOut',
    shape: 'square'
  };

  const defaultColors = ['#8B5CF6', '#10B981'];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Create Beautiful Animated Gradients
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Design stunning animated gradients and shapes for your web projects.
          Easy to customize, preview, and embed anywhere.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            to="/palette"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Create Palette
          </Link>
          <Link
            to="/shapes"
            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
          >
            Explore Shapes
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Custom Palettes
          </h2>
          <p className="text-gray-400">
            Create and save beautiful color combinations for your projects.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-accent mb-4">
            Animated Shapes
          </h2>
          <p className="text-gray-400">
            Choose from various shapes and customize their animations.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Easy Embedding
          </h2>
          <p className="text-gray-400">
            Generate embed codes to use your animations anywhere.
          </p>
        </motion.div>
      </div>

      <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-accent mb-8">
          Preview
        </h2>
        <ShapePreview
          settings={defaultSettings}
          colors={defaultColors}
        />
      </div>
    </div>
  );
}

export default Home;