import React from 'react';
import '../styles/Logo.scss';

export default function Logo({ logo, label, size }) {
  const logoSize = size === 'small' ? 40 : 150;
  return (
    <div className="logo">
      <img src={logo} width={logoSize} />
      <h1>{label}</h1>
    </div>
  );
}
