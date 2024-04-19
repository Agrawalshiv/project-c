import React, { useState } from 'react';
import './Dashboard.css'
import { FaMinus, FaPlus } from "react-icons/fa";

const Stepper = ({ initialValue, onValueChange }) => {
  const [value, setValue] = useState(initialValue);

  const increment = () => {
    setValue(prevValue => prevValue + 1);
    onValueChange(value + 1);
  };

  const decrement = () => {
    if (value > 1) {
      setValue(prevValue => prevValue - 1);
      onValueChange(value - 1);
    }
  };

  return (
    <div className="stepperWrapper">
      <label>Quantity:</label>
      <div className='stepper'>
      <button className='decrement' onClick={decrement}><FaMinus/></button>
      <span>{value}</span>
      <button className='increment' onClick={increment}><FaPlus /></button>
      </div>
    </div>
  );
};

export default Stepper;
