import React, { useState, useEffect } from 'react'
import ColorPicker from './components/ColorPicker'
import AnimationControls from './components/AnimationControls'
import ShapePreview from './components/ShapePreview'
import { saveAnimation, getStoredAnimations, removeAnimation } from './utils/localStorage'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

function App() {
  const [colors, setColors] = useState(['#8B5CF6', '#10B981']);
  const [savedAnimations, setSavedAnimations] = useState([]);
  const [animationSettings, setAnimationSettings] = useState({
    type: 'wave',
    duration: 2,
    amplitude: 20,
    ease: 'easeInOut',
    shape: 'square'
  });

  useEffect(() => {
    setSavedAnimations(getStoredAnimations());
  }, []);

  const handleSaveAnimation = () => {
    const updated = saveAnimation(colors, animationSettings);
    setSavedAnimations(updated);
  };

  const handleRemoveAnimation = (index) => {
    const updated = removeAnimation(index);
    setSavedAnimations(updated);
  };

  const handleAddColor = () => {
    setColors([...colors, '#000000']);
  };

  const handleRemoveColor = (index) => {
    if (colors.length > 2) {
      const newColors = colors.filter((_, i) => i !== index);
      setColors(newColors);
    }
  };

  const getEmbedCode = () => {
    const params = new URLSearchParams({
      colors: colors.join(','),
      ...animationSettings
    });
    const embedUrl = `${window.location.origin}/embed?${params.toString()}`;
    return `<iframe src="${embedUrl}" width="100%" height="400" frameborder="0" title="Color Choreographer Animation"></iframe>`;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="border-b border-gray-800 py-6">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Color Choreographer
        </h1>
        <meta name="description" content="Create beautiful animated color gradients for your website" />
        <meta name="keywords" content="color animation, gradient generator, web animation, CSS animation" />
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-primary mb-4">Color Palette</h2>
              <div className="grid grid-cols-1 gap-6">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <ColorPicker
                      color={color}
                      onChange={(newColor) => {
                        const newColors = [...colors];
                        newColors[index] = newColor;
                        setColors(newColors);
                      }}
                      label={`Color ${index + 1}`}
                    />
                    {colors.length > 2 && (
                      <button
                        onClick={() => handleRemoveColor(index)}
                        className="p-2 text-red-500 hover:text-red-400"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                {colors.length < 5 && (
                  <button
                    onClick={handleAddColor}
                    className="flex items-center justify-center gap-2 w-full py-2 text-primary hover:text-primary-dark transition-colors"
                  >
                    <PlusIcon className="w-5 h-5" />
                    Add Color
                  </button>
                )}
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
            <ShapePreview
              settings={animationSettings}
              colors={colors}
            />
            
            <div className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-300">Embed on your website</h3>
              <div className="relative">
                <pre className="rounded-lg bg-gray-700 p-4 text-sm overflow-x-auto">
                  <code>{getEmbedCode()}</code>
                </pre>
                <button
                  onClick={() => navigator.clipboard.writeText(getEmbedCode())}
                  className="absolute top-2 right-2 px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-300">Saved Animations</h3>
                <button
                  onClick={handleSaveAnimation}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                >
                  Save Current
                </button>
              </div>
              <div className="space-y-4">
                {savedAnimations.map((animation, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {animation.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border border-gray-600"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setColors(animation.colors);
                          setAnimationSettings(animation.settings);
                        }}
                        className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => handleRemoveAnimation(index)}
                        className="p-1 text-red-500 hover:text-red-400"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App;