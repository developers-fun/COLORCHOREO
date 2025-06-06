import React, { useState, useRef, useEffect } from 'react';

function BorderControls({ settings, onUpdate }) {
  const [isDragging, setIsDragging] = useState(null);
  const containerRef = useRef(null);
  const [corners, setCorners] = useState({
    topLeftX: 50,
    topLeftY: 50,
    topRightX: 50,
    topRightY: 50,
    bottomRightX: 50,
    bottomRightY: 50,
    bottomLeftX: 50,
    bottomLeftY: 50
  });

  const handleMouseDown = (corner) => {
    setIsDragging(corner);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    
    setCorners(prev => ({
      ...prev,
      [isDragging]: isDragging.endsWith('X') ? x : y
    }));

    const borderRadius = `${corners.topLeftX}% ${100-corners.topRightX}% ${corners.bottomRightX}% ${100-corners.bottomLeftX}% / ${corners.topLeftY}% ${corners.topRightY}% ${100-corners.bottomRightY}% ${100-corners.bottomLeftY}%`;
    
    onUpdate({
      ...settings,
      borderRadius
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
          <label className="text-sm text-gray-300">Fancy Border Radius</label>
          <div 
            ref={containerRef}
            className="h-64 bg-gray-700 rounded relative p-4"
          >
            <div 
              className="w-full h-full bg-gray-600"
              style={{
                borderRadius: `${corners.topLeftX}% ${100-corners.topRightX}% ${corners.bottomRightX}% ${100-corners.bottomLeftX}% / ${corners.topLeftY}% ${corners.topRightY}% ${100-corners.bottomRightY}% ${100-corners.bottomLeftY}%`
              }}
            />
            
            {/* Top Left Controls */}
            <div
              className={`absolute top-0 left-[${corners.topLeftX}%] w-4 h-4 bg-primary rounded-full cursor-ns-resize ${isDragging === 'topLeftY' ? 'scale-125' : ''}`}
              onMouseDown={() => handleMouseDown('topLeftY')}
              style={{ transform: `translate(-50%, -50%)` }}
            />
            <div
              className={`absolute top-[${corners.topLeftY}%] left-0 w-4 h-4 bg-primary rounded-full cursor-ew-resize ${isDragging === 'topLeftX' ? 'scale-125' : ''}`}
              onMouseDown={() => handleMouseDown('topLeftX')}
              style={{ transform: `translate(-50%, -50%)` }}
            />

            {/* Top Right Controls */}
            <div
              className={`absolute top-0 right-[${corners.topRightX}%] w-4 h-4 bg-primary rounded-full cursor-ns-resize ${isDragging === 'topRightY' ? 'scale-125' : ''}`}
              onMouseDown={() => handleMouseDown('topRightY')}
              style={{ transform: `translate(50%, -50%)` }}
            />
            <div
              className={`absolute top-[${corners.topRightY}%] right-0 w-4 h-4 bg-primary rounded-full cursor-ew-resize ${isDragging === 'topRightX' ? 'scale-125' : ''}`}
              onMouseDown={() => handleMouseDown('topRightX')}
              style={{ transform: `translate(50%, -50%)` }}
            />

            {/* Bottom Right Controls */}
            <div
              className={`absolute bottom-0 right-[${corners.bottomRightX}%] w-4 h-4 bg-primary rounded-full cursor-ns-resize ${isDragging === 'bottomRightY' ? 'scale-125' : ''}`}
              onMouseDown={() => handleMouseDown('bottomRightY')}
              style={{ transform: `translate(50%, 50%)` }}
            />
            <div
              className={`absolute bottom-[${corners.bottomRightY}%] right-0 w-4 h-4 bg-primary rounded-full cursor-ew-resize ${isDragging === 'bottomRightX' ? 'scale-125' : ''}`}
              onMouseDown={() => handleMouseDown('bottomRightX')}
              style={{ transform: `translate(50%, 50%)` }}
            />

            {/* Bottom Left Controls */}
            <div
              className={`absolute bottom-0 left-[${corners.bottomLeftX}%] w-4 h-4 bg-primary rounded-full cursor-ns-resize ${isDragging === 'bottomLeftY' ? 'scale-125' : ''}`}
              onMouseDown={() => handleMouseDown('bottomLeftY')}
              style={{ transform: `translate(-50%, 50%)` }}
            />
            <div
              className={`absolute bottom-[${corners.bottomLeftY}%] left-0 w-4 h-4 bg-primary rounded-full cursor-ew-resize ${isDragging === 'bottomLeftX' ? 'scale-125' : ''}`}
              onMouseDown={() => handleMouseDown('bottomLeftX')}
              style={{ transform: `translate(-50%, 50%)` }}
            />
          </div>
          <div className="text-sm text-gray-400 mt-2">
            border-radius: {`${corners.topLeftX}% ${100-corners.topRightX}% ${corners.bottomRightX}% ${100-corners.bottomLeftX}% / ${corners.topLeftY}% ${corners.topRightY}% ${100-corners.bottomRightY}% ${100-corners.bottomLeftY}%`}
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