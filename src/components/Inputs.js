import React from 'react';
import '../styles/Inputs.scss';

export const TextField = ({ textInput, onChange }) => {
  return (
    <>
      {textInput && (
        <div className="textField">
          <label>{textInput}</label>
          <input type="text" onChange={onChange} placeholder={textInput} />
        </div>
      )}
    </>
  );
};
