import React from 'react';

interface ColorSwatchProps {
  color: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ color }) => (
  <div
    style={{
      width: '24px',
      height: '24px',
      borderRadius: '4px',
      border: '1px solid rgba(0,0,0,0.1)',
      display: 'inline-block',
      verticalAlign: 'middle',
      marginRight: '8px',
      backgroundColor: color,
    }}
  />
);
