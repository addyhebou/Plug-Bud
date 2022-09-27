import { React } from 'react';

export default function Dropdown({ options, selectedValue, changed }) {
  const dropdownChanged = (e) => {
    changed(e.target.value);
  };

  return (
    <div>
      <select value={selectedValue} onChange={dropdownChanged}>
        {options.map((item, idx) => (
          <option key={idx} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      <p>{selectedValue}</p>
    </div>
  );
}
