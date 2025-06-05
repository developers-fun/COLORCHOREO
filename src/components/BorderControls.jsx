import React from 'react';

function BorderControls({ settings, onUpdate }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-300">Border Settings</h3>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Border Width (px)</label>
          <input
            type="range"
            min="0"
            max="20"
            value={settings.borderWidth || 0}
            onChange={(e) => onUpdate({ ...settings, borderWidth: parseInt(e.target.value) })}
            className="w-full"
          />
          <span className="text-sm text-gray-400">{settings.borderWidth || 0}px</span>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Border Style</label>
          <select
            value={settings.borderStyle || 'solid'}
            onChange={(e) => onUpdate({ ...settings, borderStyle: e.target.value })}
            className="w-full bg-gray-700 rounded px-3 py-2"
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="double">Double</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Border Radius (%)</label>
          <input
            type="range"
            min="0"
            max="50"
            value={settings.borderRadius || 0}
            onChange={(e) => onUpdate({ ...settings, borderRadius: parseInt(e.target.value) })}
            className="w-full"
          />
          <span className="text-sm text-gray-400">{settings.borderRadius || 0}%</span>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Border Color</label>
          <input
            type="color"
            value={settings.borderColor || '#ffffff'}
            onChange={(e) => onUpdate({ ...settings, borderColor: e.target.value })}
            className="w-full h-10 bg-gray-700 rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default BorderControls;