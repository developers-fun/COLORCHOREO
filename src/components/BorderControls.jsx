import React, { useState, useRef, useEffect } from 'react';

function BorderControls({ settings, onUpdate }) {
  const [isDragging, setIsDragging] = useState(null);
  const containerRef = useRef(null);
  const [corners, setCorners] = useState({
    topLeft: settings.borderRadius || 0,
    topRight: settings.borderRadius || 0,
    bottomRight: settings.borderRadius || 0,
    bottomLeft: settings.borderRadius || 0
  });

  const handleMouseDown = (corner) => {
    setIsDragging(corner);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    
    setCorners(prev => ({
      ...prev,
      [isDragging]: Math.round(x)
    }));

    onUpdate({
      ...settings,
      borderRadius: `${corners.topLeft}% ${corners.topRight}% ${corners.bottomRight}% ${corners.bottomLeft}%`
    });
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

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
          <label className="text-sm text-gray-300">Border Radius</label>
          <div 
            ref={containerRef}
            className="h-40 bg-gray-700 rounded relative p-4"
          >
            {/* Visual representation of the shape */}
            <div 
              className="w-full h-full bg-gray-600"
              style={{
                borderRadius: `${corners.topLeft}% ${corners.topRight}% ${corners.bottomRight}% ${corners.bottomLeft}%`
              }}
            />
            
            {/* Interactive dots */}
            <div
              className={`absolute top-4 left-4 w-4 h-4 bg-primary rounded-full cursor-pointer ${isDragging === 'topLeft' ? 'scale-125' : ''}`}
              onMouseDown={() => handleMouseDown('topLeft')}
              style={{ transform: `translate(-50%, -50%)` }}
            />
            <div
              className={`absolute top-4 right-4 w-4 h-4 bg-primary rounded-full cursor-pointer ${isDragging === 'topRight' ? 'scale-125' : ''}`}
              onMouseDown={() => handleMouseDown('topRight')}
              style={{ transform: `translate(50%, -50%)` }}
            />
            <div
              className={`absolute bottom-4 right-4 w-4 h-4 bg-primary rounded-full cursor-pointer ${isDragging === 'bottomRight' ? 'scale-125' : ''}`}
              onMouseDown={() => handleMouseDown('bottomRight')}
              style={{ transform: `translate(50%, 50%)` }}
            />
            <div
              className={`absolute bottom-4 left-4 w-4 h-4 bg-primary rounded-full cursor-pointer ${isDragging === 'bottomLeft' ? 'scale-125' : ''}`}
              onMouseDown={() => handleMouseDown('bottomLeft')}
              style={{ transform: `translate(-50%, 50%)` }}
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            <span className="text-sm text-gray-400 text-center">{corners.topLeft}%</span>
            <span className="text-sm text-gray-400 text-center">{corners.topRight}%</span>
            <span className="text-sm text-gray-400 text-center">{corners.bottomRight}%</span>
            <span className="text-sm text-gray-400 text-center">{corners.bottomLeft}%</span>
          </div>
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