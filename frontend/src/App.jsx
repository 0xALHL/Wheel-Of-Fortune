import React, { useState } from 'react';

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState('Spin the wheel!');

  const slices = [
    { label: '$500', color: '#ff4757' },
    { label: '$600', color: '#2ed573' },
    { label: '$700', color: '#1e90ff' },
    { label: '$800', color: '#ffa502' },
    { label: 'BANKRUPT', color: '#2f3542' },
    { label: '$900', color: '#9b59b6' },
    { label: 'LOSE A TURN', color: '#ff6b81' },
    { label: '$1000', color: '#26de81' }
  ];

  const numSlices = slices.length;
  const sliceAngle = 360 / numSlices; // 45 degrees per slice

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult('Spinning...');

    // Pick a random slice
    const selectedIndex = Math.floor(Math.random() * numSlices);

    // Calculate how many degrees to spin so selectedIndex lands at 12 o'clock (0 deg)
    const targetSliceCenter = selectedIndex * sliceAngle + sliceAngle / 2;
    const targetDegree = (360 - targetSliceCenter) % 360;

    // Add 5 full extra spins (1800 deg) to the current rotation base
    const currentRot = rotation - (rotation % 360);
    const totalRotation = currentRot + 1800 + targetDegree;

    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(`Landed on: ${slices[selectedIndex].label}`);
    }, 4000);
  };

  // Helper to draw SVG pie slices
  const getSlicePath = (index) => {
    const startAngle = (index * sliceAngle - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * sliceAngle - 90) * (Math.PI / 180);
    const x1 = 180 + 180 * Math.cos(startAngle);
    const y1 = 180 + 180 * Math.sin(startAngle);
    const x2 = 180 + 180 * Math.cos(endAngle);
    const y2 = 180 + 180 * Math.sin(endAngle);
    return `M 180 180 L ${x1} ${y1} A 180 180 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '40px' }}>
      <h2>Wheel of Fortune</h2>

      {/* Main Container */}
      <div style={{ position: 'relative', width: '360px', height: '360px', margin: '0 auto' }}>
        
        {/* Top Pointer (12 o'clock) */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '14px solid transparent',
          borderRight: '14px solid transparent',
          borderTop: '26px solid #e74c3c',
          zIndex: 30
        }} />

        {/* Rotating SVG Wheel */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
        }}>
          <svg width="360" height="360" viewBox="0 0 360 360">
            {slices.map((slice, i) => {
              const textAngle = i * sliceAngle + sliceAngle / 2 - 90;
              const textRad = textAngle * (Math.PI / 180);
              const tx = 180 + 115 * Math.cos(textRad);
              const ty = 180 + 115 * Math.sin(textRad);

              return (
                <g key={i}>
                  <path d={getSlicePath(i)} fill={slice.color} stroke="#2c3e50" strokeWidth="2" />
                  <text
                    x={tx}
                    y={ty}
                    fill="#ffffff"
                    fontSize="13"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textAngle + 90}, ${tx}, ${ty})`}
                  >
                    {slice.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Center Cap Hub */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60px',
          height: '60px',
          backgroundColor: '#f1c40f',
          border: '4px solid #2c3e50',
          borderRadius: '50%',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          color: '#2c3e50',
          fontSize: '12px'
        }}>
          SPIN
        </div>
      </div>

      {/* Button & Result */}
      <div style={{ marginTop: '30px' }}>
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          style={{
            padding: '12px 28px',
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: isSpinning ? '#bdc3c7' : '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            cursor: isSpinning ? 'not-allowed' : 'pointer'
          }}
        >
          {isSpinning ? 'Spinning...' : 'SPIN'}
        </button>

        <p style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '20px', color: '#2c3e50' }}>
          {result}
        </p>
      </div>
    </div>
  );
}

export default App;