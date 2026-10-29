import React, { useState } from 'react';

const Wheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState('Spin the wheel!');

  const slices = [
    { label: '$500', color: '#e74c3c' },
    { label: '$600', color: '#3498db' },
    { label: '$700', color: '#2ecc71' },
    { label: '$800', color: '#f1c40f' },
    { label: 'BANKRUPT', color: '#2c3e50' },
    { label: '$900', color: '#9b59b6' },
    { label: 'LOSE A TURN', color: '#e67e22' },
    { label: '$1000', color: '#1abc9c' }
  ];

  const sliceAngle = 360 / slices.length;

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult('Spinning...');

    const randomSliceIndex = Math.floor(Math.random() * slices.length);
    const extraDegrees = 1800; //  spins
    const targetDegree = 360 - (randomSliceIndex * sliceAngle + sliceAngle / 2);
    const totalRotation = rotation + extraDegrees + targetDegree;

    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(`Landed on: ${slices[randomSliceIndex].label}`);
    }, 4000);
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'sans-serif', marginTop: '30px' }}>
      <h2>Wheel of Fortune</h2>
      
      {/* Pointer */}
      <div style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto' }}>
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '20px solid #333',
          zIndex: 10
        }} />

        {/* Wheel Body */}
        <div
          onClick={spinWheel}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '5px solid #333',
            background: `conic-gradient(
              #e74c3c 0deg 45deg,
              #3498db 45deg 90deg,
              #2ecc71 90deg 135deg,
              #f1c40f 135deg 180deg,
              #2c3e50 180deg 225deg,
              #9b59b6 225deg 270deg,
              #e67e22 270deg 315deg,
              #1abc9c 315deg 360deg
            )`,
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
            cursor: isSpinning ? 'not-allowed' : 'pointer'
          }}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isSpinning ? 'not-allowed' : 'pointer'
          }}
        >
          {isSpinning ? 'Spinning...' : 'SPIN'}
        </button>
        <p style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '15px' }}>{result}</p>
      </div>
    </div>
  );
};

export default Wheel;