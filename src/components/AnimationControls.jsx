import React from 'react';

const presets = {
  wave: {
    type: 'wave',
    duration: 2,
    amplitude: 20,
    ease: 'easeInOut',
    shape: 'square'
  },
  pulse: {
    type: 'pulse',
    duration: 1.5,
    scale: 1.2,
    ease: 'easeOut',
    shape: 'circle'
  },
  morph: {
    type: 'morph',
    duration: 3,
    complexity: 5,
    ease: 'linear',
    shape: 'blob'
  },
};

const easeOptions = [
  { value: 'linear', label: 'Linear' },
  { value: 'easeIn', label: 'Ease In' },
  { value: 'easeOut', label: 'Ease Out' },
  { value: 'easeInOut', label: 'Ease In Out' },
  { value: 'circIn', label: 'Circular In' },
  { value: 'circOut', label: 'Circular Out' },
  { value: 'circInOut', label: 'Circular In Out' },
  { value: 'backIn', label: 'Back In' },
  { value: 'backOut', label: 'Back Out' },
  { value: 'backInOut', label: 'Back In Out' },
];

const shapeOptions = [
  { value: 'square', label: 'Square' },
  { value: 'circle', label: 'Circle' },
  { value: 'blob', label: 'Blob' },
  { value: 'star', label: 'Star' },
  { value: 'triangle', label: 'Triangle' },
];

function AnimationControls({ settings, onUpdate }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-300">Animation Settings</h3>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Shape</label>
          <select
            value={settings.shape}
            onChange={(e) => onUpdate({ ...settings, shape: e.target.value })}
            className="w-full bg-gray-700 rounded px-3 py-2"
          >
            {shapeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Animation Type</label>
          <select
            value={settings.type}
            onChange={(e) => onUpdate({ ...settings, type: e.target.value })}
            className="w-full bg-gray-700 rounded px-3 py-2"
          >
            <option value="wave">Wave</option>
            <option value="pulse">Pulse</option>
            <option value="morph">Morph</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Duration (seconds)</label>
          <input
            type="number"
            value={settings.duration}
            onChange={(e) => onUpdate({ ...settings, duration: parseFloat(e.target.value) })}
            className="w-full bg-gray-700 rounded px-3 py-2"
            step="0.1"
            min="0.1"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Easing</label>
          <select
            value={settings.ease}
            onChange={(e) => onUpdate({ ...settings, ease: e.target.value })}
            className="w-full bg-gray-700 rounded px-3 py-2"
          >
            {easeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-700">
        <label className="text-sm text-gray-300 mb-2 block">Presets</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(presets).map(([name, preset]) => (
            <button
              key={name}
              onClick={() => onUpdate(preset)}
              className="px-3 py-1 bg-gray-700 rounded-full text-sm hover:bg-gray-600 transition-colors"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnimationControls;