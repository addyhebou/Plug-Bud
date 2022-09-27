import React from 'react';
import '../styles/BannerText.scss';
import { TextField } from '../components/Inputs.js';
export default function BannerText({ title, subtitle, textInput, onChange }) {
  console.log(title);
  return (
    <div className="bannerText">
      <div className="headerText">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <TextField textInput={textInput} onChange={onChange} />
    </div>
  );
}
