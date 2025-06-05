import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { motion, AnimatePresence } from 'framer-motion';

function ColorPicker({ color, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-300">{label}</label>
      <div className="relative">
        <button
          className="w-full h-12 rounded cursor-pointer border-2 border-gray-600"
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 top-full left-0 mt-2"
            >
              <div className="bg-gray-800 p-3 rounded-lg shadow-xl">
                <HexColorPicker color={color} onChange={onChange} />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full mt-2 bg-gray-700 rounded px-3 py-2 text-sm"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ColorPicker;