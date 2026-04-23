'use client';

import { useEffect, useRef, useState } from 'react';
import './Dock.css';

export default function Dock({
  items,
  className = '',
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  baseItemSize = 50
}) {
  const dockRef = useRef(null);
  const [positions, setPositions] = useState({});

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const handleMouseMove = (e) => {
      const dockRect = dock.getBoundingClientRect();
      const newPositions = {};

      items.forEach((item, index) => {
        const itemEl = dock.children[index];
        if (!itemEl) return;

        const itemRect = itemEl.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2;
        const itemCenterY = itemRect.top + itemRect.height / 2;

        const distance_ = Math.sqrt(
          Math.pow(e.clientX - itemCenterX, 2) +
          Math.pow(e.clientY - itemCenterY, 2)
        );

        const size = Math.max(
          baseItemSize,
          Math.min(
            magnification,
            baseItemSize + (distance - distance_) * (magnification - baseItemSize) / distance
          )
        );

        newPositions[index] = size;
      });

      setPositions(newPositions);
    };

    const handleMouseLeave = () => {
      setPositions({});
    };

    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      dock.removeEventListener('mousemove', handleMouseMove);
      dock.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [items, distance, magnification, baseItemSize]);

  return (
    <div
      ref={dockRef}
      className={`dock-panel ${className}`}
      style={{ height: panelHeight }}
      role="toolbar"
      aria-label="Application dock"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="dock-item"
          onClick={item.onClick}
          style={{
            width: positions[index] || baseItemSize,
            height: positions[index] || baseItemSize,
            transition: Object.keys(positions).length === 0 ? 'all 0.3s ease-out' : 'all 0.05s linear'
          }}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && item.onClick()}
        >
          <div className="dock-icon">{item.icon}</div>
          <div className="dock-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
