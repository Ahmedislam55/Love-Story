import React, { useEffect, useState } from 'react';

export const FloatingHearts = ({ active = true }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (!active) {
      setHearts([]);
      return;
    }

    const colors = ['#f43f5e', '#ec4899', '#fb7185', '#fda4af', '#f472b6', '#fca5a5'];
    const generatedHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.floor(Math.random() * 20) + 12,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setHearts(generatedHearts);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute animate-float-heart transition-opacity"
          style={{
            left: `${h.left}%`,
            bottom: '-40px',
            fontSize: `${h.size}px`,
            color: h.color,
            opacity: h.opacity,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
};
