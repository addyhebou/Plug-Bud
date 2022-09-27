import React from 'react';
import '../styles/Header.scss';
import plugbugLogo from '../images/plugbugLogo.png';
import Logo from './Logo.js';

export default function Header() {
  return (
    <div className="header">
      <Logo logo={plugbugLogo} label={'plugbug'} size={'small'} />
    </div>
  );
}
