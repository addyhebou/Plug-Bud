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

export const SingleChoiceField = ({ selectedOption, onChange, options }) => {
  return (
    <div className="singleChoiceField">
      <legend>Sort By:</legend>
      {options.map((option) => {
        return (
          <div>
            <input
              type="radio"
              id={option}
              name="drone"
              value={option}
              checked={selectedOption === option}
              onClick={onChange}
            />
            <label for={option}>{option}</label>
          </div>
        );
      })}
    </div>
  );
};
