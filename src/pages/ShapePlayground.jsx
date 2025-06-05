import React, { useState } from 'react';
import ShapePreview from '../components/ShapePreview';
import AnimationControls from '../components/AnimationControls';

function ShapePlayground() {
  const [settings, setSettings] = useState({
    type: 'wave',
    duration: 2,
    amplitude: 20,
    ease: 'easeInOut',
    shape: 'square'
  });

  const [colors] = useState(['#8B5CF6', '#10B981']);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-accent mb-6">Shape Playground</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <AnimationControls
            settings={settings}
            onUpdate={setSettings}
          />
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <ShapePreview
            settings={settings}
            colors={colors}
          />
        </div>
      </div>
    </div>
  );
}

export default ShapePlayground;