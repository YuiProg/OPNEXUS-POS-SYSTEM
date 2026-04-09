import React, { useState } from 'react'
import './Calculator.css'

const Calculator = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [history, setHistory] = useState([])

  const handleNumber = (num) => {
    setDisplay(display === '0' ? String(num) : display + num)
  }

  const handleOperation = (op) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(display))
    } else {
      calculate()
    }
    setOperation(op)
    setDisplay('0')
  }

  const calculate = () => {
    if (previousValue === null || operation === null) return

    const current = parseFloat(display)
    let result

    switch (operation) {
      case '+':
        result = previousValue + current
        break
      case '-':
        result = previousValue - current
        break
      case '*':
        result = previousValue * current
        break
      case '/':
        result = previousValue / current
        break
      default:
        return
    }

    const entry = `${previousValue} ${operation} ${current} = ${result}`
    setHistory([...history, entry])
    setDisplay(String(result))
    setPreviousValue(null)
    setOperation(null)
  }

  const backspace = () => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0')
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
  }

  return (
      <div className='calculator-container'>
        <div className='ellipse'/>
        <div className='ellipse2'/>
        <div className='calculator-container__items'>
          <div className='calculator-top-contents'>
            <div className='calculator-history'>
              {history}
            </div>
            <div className='calculator-display'>
              {display}
            </div>
          </div>
          <div className='calculator-buttons'>
            <div className='calculator-buttons-left'>
              <div className='calc-btn-row1'>
                <button className='white-btn' onClick={handleClear}>AC</button>
                <button className='white-btn' onClick={backspace}>⌫</button>
                <button className='black-btn' onClick={() => handleOperation('/')}>/</button>
                <button className='black-btn' onClick={() => handleOperation('*')}>*</button>
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
                <button className='black-btn' onClick={() => setDisplay(display + '.')}>.</button>
              </div>
            </div>
            <div className='calculator-buttons-right'>
              <div className='calc-btn-rightcol'>
                <button className='black-btn' onClick={() => handleOperation('-')}> - </button>
                <button className='black-btn' onClick={() => handleOperation('+')}> + </button>
                <button className='black-btn' onClick={calculate}>=</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}


export default Calculator;