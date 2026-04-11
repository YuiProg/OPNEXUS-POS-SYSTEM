import React, { useState } from 'react'
import './Calculator.css'

const Calculator = ({ onChange }) => {
  const [display, setDisplay] = useState('0')

  const handleNumber = (num) => {
    const newDisplay = display === '0' ? String(num) : display + num
    setDisplay(newDisplay)
    onChange?.(parseFloat(newDisplay))
  }

  const handleDot = () => {
    if (display.includes('.')) return
    const newDisplay = display + '.'
    setDisplay(newDisplay)
  }

  const backspace = () => {
    const newDisplay = display.length > 1 ? display.slice(0, -1) : '0'
    setDisplay(newDisplay)
    onChange?.(parseFloat(newDisplay))
  }

  const handleClear = () => {
    setDisplay('0')
    onChange?.(0)
  }

  return (
    <div className='calculator-container'>
      <div className='ellipse'/>
      <div className='ellipse2'/>
      <div className='calculator-container__items'>
        <div className='calculator-top-contents'>
          <div className='calculator-display'>
            {display}
          </div>
        </div>
        <div className='calculator-buttons'>
          <div className='calculator-buttons-left'>
            <div className='calc-btn-row1'>
              <button className='white-btn' onClick={handleClear}>AC</button>
              <button className='white-btn' onClick={backspace}>⌫</button>
            </div>
            <div className='calc-btn-row2'>
              <button className='black-btn' onClick={() => handleNumber(7)}>7</button>
              <button className='black-btn' onClick={() => handleNumber(8)}>8</button>
              <button className='black-btn' onClick={() => handleNumber(9)}>9</button>
            </div>
            <div className='calc-btn-row3'>
              <button className='black-btn' onClick={() => handleNumber(4)}>4</button>
              <button className='black-btn' onClick={() => handleNumber(5)}>5</button>
              <button className='black-btn' onClick={() => handleNumber(6)}>6</button>
            </div>
            <div className='calc-btn-row4'>
              <button className='black-btn' onClick={() => handleNumber(1)}>1</button>
              <button className='black-btn' onClick={() => handleNumber(2)}>2</button>
              <button className='black-btn' onClick={() => handleNumber(3)}>3</button>
            </div>
            <div className='calc-btn-row5'>
              <button className='black-btn' onClick={() => handleNumber(0)}>0</button>
              <button className='black-btn' onClick={handleDot}>.</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;