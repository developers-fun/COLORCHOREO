import React, { useState } from 'react'
import ColorPicker from './components/ColorPicker'
import AnimationControls from './components/AnimationControls'
import ShapePreview from './components/ShapePreview'

function App() {
  const [colors, setColors] = useState(['#8B5CF6', '#10B981']);
  const [animationSettings, setAnimationSettings] = useState({
    type: 'wave',
    duration: 2,
    amplitude: 20,
    ease: 'easeInOut',
    shape: 'square'
  });

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="border-b border-gray-800 py-6">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Color Choreographer
        </h1>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-primary mb-4">Color Palette</h2>
              <div className="grid grid-cols-1 gap-6">
                <ColorPicker
                  color={colors[0]}
                  onChange={(color) => setColors([color, colors[1]])}
                  label="Primary Color"
                />
                <ColorPicker
                  color={colors[1]}
                  onChange={(color) => setColors([colors[0], color])}
                  label="Secondary Color"
                />
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <AnimationControls
                settings={animationSettings}
                onUpdate={setAnimationSettings}
              />
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-3xl font-semibold text-accent mb-4">Animation Preview</h2>
            <a className="text-2xl">Embed it on your website</a>
            <code className="rounded-lg bg-gray-600 p-4">faoiehfaoeufh</code>
            <ShapePreview
              settings={animationSettings}
              colors={colors}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App;