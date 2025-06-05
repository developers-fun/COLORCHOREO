import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const getShapeClassName = (shape) => {
  switch (shape) {
    case 'circle':
      return 'rounded-full';
    case 'triangle':
      return 'clip-path-triangle';
    case 'star':
      return 'clip-path-star';
    case 'blob':
      return 'rounded-[30%_70%_70%_30%/30%_30%_70%_70%]';
    default:
      return 'rounded-lg';
  }
};

const getAnimationVariants = (settings, colors) => {
  const baseTransition = {
    duration: settings.duration,
    repeat: Infinity,
    ease: settings.ease || 'easeInOut'
  };

  switch (settings.type) {
    case 'wave':
      return {
        animate: {
          y: [0, -settings.amplitude, 0],
          transition: baseTransition
        }
      };
    case 'pulse':
      return {
        animate: {
          scale: [1, settings.scale, 1],
          transition: baseTransition
        }
      };
    case 'morph':
      return {
        animate: {
          borderRadius: settings.shape === 'blob' 
            ? ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 50% 50%"]
            : ["10%", "25%"],
          transition: baseTransition
        }
      };
    default:
      return {};
  }
};

function ShapePreview({ settings, colors }) {
  const variants = getAnimationVariants(settings, colors);
  const shapeClass = getShapeClassName(settings.shape);
  
  const gradient = useMemo(() => {
    const stops = colors.map((color, index) => {
      const percentage = (index / (colors.length - 1)) * 100;
      return `${color} ${percentage}%`;
    }).join(', ');
    return `linear-gradient(135deg, ${stops})`;
  }, [colors]);

  const borderStyle = {
    borderWidth: `${settings.borderWidth || 0}px`,
    borderStyle: settings.borderStyle || 'solid',
    borderRadius: `${settings.borderRadius || 0}%`,
    borderColor: settings.borderColor || '#ffffff'
  };

  return (
    <div className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center p-8 mt-8">
      <motion.div
        className={`w-full h-full ${shapeClass}`}
        style={{
          background: gradient,
          ...borderStyle
        }}
        animate="animate"
        variants={variants}
      />
    </div>
  );
}

export default ShapePreview;