import React, { useState, useRef, useEffect } from 'react';

function BorderControls({ settings, onUpdate }) {
  const [isDragging, setIsDragging] = useState(null);
  const containerRef = useRef(null);
  const [points, setPoints] = useState({
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  });

  const handleMouseDown = (point) => {
    setIsDragging(point);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    let value;
    
    if (isDragging === 'left' || isDragging === 'right') {
      value = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    } else {
      value = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    }
    
    setPoints(prev => ({
      ...prev,
      [isDragging]: value
    }));

    const borderRadius = `${points.top}% ${100 - points.top}% ${points.bottom}% ${100 - points.bottom}% / ${100 - points.left}% ${100 - points.right}% ${points.right}% ${points.left}%`;
    
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
                borderRadius: `${points.top}% ${100 - points.top}% ${points.bottom}% ${100 - points.bottom}% / ${100 - points.left}% ${100 - points.right}% ${points.right}% ${points.left}%`
              }}
            />
            
            {/* Top control line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-500" />
            <div
              className="absolute top-0 w-4 h-4 bg-primary rounded-full cursor-ew-resize"
              style={{ left: `${points.top}%`, transform: 'translate(-50%, -50%)' }}
              onMouseDown={() => handleMouseDown('top')}
            />

            {/* Right control line */}
            <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-gray-500" />
            <div
              className="absolute right-0 w-4 h-4 bg-primary rounded-full cursor-ns-resize"
              style={{ top: `${points.right}%`, transform: 'translate(50%, -50%)' }}
              onMouseDown={() => handleMouseDown('right')}
            />

            {/* Bottom control line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-500" />
            <div
              className="absolute bottom-0 w-4 h-4 bg-primary rounded-full cursor-ew-resize"
              style={{ left: `${points.bottom}%`, transform: 'translate(-50%, 50%)' }}
              onMouseDown={() => handleMouseDown('bottom')}
            />

            {/* Left control line */}
            <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-gray-500" />
            <div
              className="absolute left-0 w-4 h-4 bg-primary rounded-full cursor-ns-resize"
              style={{ top: `${points.left}%`, transform: 'translate(-50%, -50%)' }}
              onMouseDown={() => handleMouseDown('left')}
            />
          </div>
          <div className="text-sm text-gray-400 mt-2 break-all">
            border-radius: {`${points.top}% ${100 - points.top}% ${points.bottom}% ${100 - points.bottom}% / ${100 - points.left}% ${100 - points.right}% ${points.right}% ${points.left}%`}
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