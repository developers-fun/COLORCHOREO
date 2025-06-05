import React, { useState } from 'react';
import ColorPicker from '../components/ColorPicker';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

function PaletteBuilder() {
  const [palette, setPalette] = useState(['#8B5CF6', '#10B981']);

  const handleAddColor = () => {
    setPalette([...palette, '#000000']);
  };

  const handleRemoveColor = (index) => {
    if (palette.length > 2) {
      const newPalette = palette.filter((_, i) => i !== index);
      setPalette(newPalette);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Palette Builder</h1>
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="grid grid-cols-1 gap-6">
          {palette.map((color, index) => (
            <div key={index} className="flex items-center gap-4">
              <ColorPicker
                color={color}
                onChange={(newColor) => {
                  const newPalette = [...palette];
                  newPalette[index] = newColor;
                  setPalette(newPalette);
                }}
                label={`Color ${index + 1}`}
              />
              {palette.length > 2 && (
                <button
                  onClick={() => handleRemoveColor(index)}
                  className="p-2 text-red-500 hover:text-red-400"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          {palette.length < 8 && (
            <button
              onClick={handleAddColor}
              className="flex items-center justify-center gap-2 w-full py-2 text-primary hover:text-primary-dark transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Add Color
            </button>
          )}
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Preview</h2>
          <div className="h-32 rounded-lg" style={{
            background: `linear-gradient(135deg, ${palette.join(', ')})`
          }} />
        </div>
      </div>
    </div>
  );
}

export default PaletteBuilder;