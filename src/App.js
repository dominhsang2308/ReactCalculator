import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
function App() {
  return (
    <div className="App">
        <Calculator />
    </div>
  );
}
const Calculator = () => {

  const [input, setInput] = useState('0')
  
  const getDisplay = () => {
    const section = input.split(/[\+\-\*\/]/)
    if(section[section.length -1] === ''){
      section.pop()
    }
    return section[section.length -1]
  }

  const handleNumberClick = (char) => {
    if(input !== '0' || char === '.'){
      setInput(`${input} ${char}`)
    }else{
      setInput(char)
    }
    
  }

  const handleOperationClick = (operations) => {
    const section = input.split(/([+\-*/])/)
    const last_element = section[section.length-1]
    if ('+-*/'.includes(last_element)){
      const input_remove_last = section.slice(0,-2).join('')
      setInput(`${input_remove_last} ${operations}`)
    }else{
      setInput(`${input} ${operations}`)
      handleEquals(`${input} ${operations}`)
    }
  }

  const handleEquals = (input) => {
    const isNum = (str) => {
      return str !== '' & !isNaN(str) && !isNaN(parseFloat(str))
    }
    const section = input.split(/([+\-*/])/)
    if (section.length > 2){
      if(isNum(section[0]) & isNum(section[2]) & '+-*/'.includes(section[1])){
        const answer = eval(section.slice(0,3).join(''))
        const rest_of_input = section.slice(3).join('')
        console.log(answer, input)
        setInput(`${answer} ${rest_of_input}`)
      }
    }
  }

  const handleClear = () => {
    setInput('0')
  }
  return (
    <div className='calculator'>
        <div className='answer-section'>
            <h1 className='answer'>{getDisplay()}</h1>
        </div>
        <div className='button-section'>
            <div className='button-row'>
                <CalculatorButton shape='circle' color='gray' text='AC' handleClick = {handleClear} />
                <CalculatorButton shape='circle' color='gray' text='+/-'/>
                <CalculatorButton shape='circle' color='gray' text='%'/>
                <CalculatorButton shape='circle' color='orange' text='÷' handleClick={(operations)=>handleOperationClick('/')} />
            </div>
            <div className='button-row'>
                <CalculatorButton shape='circle' color='black' text='7' handleClick = {(char) =>handleNumberClick('7')} />
                <CalculatorButton shape='circle' color='black' text='8' handleClick = {(char) =>handleNumberClick('8')}/>
                <CalculatorButton shape='circle' color='black' text='9' handleClick = {(char) =>handleNumberClick('9')}/>
                <CalculatorButton shape='circle' color='orange' text='X' handleClick={(operations)=>handleOperationClick('*')}/>
            </div>
            <div className='button-row'>
                <CalculatorButton shape='circle' color='black' text='4' handleClick = {(char) =>handleNumberClick('4')}/>
                <CalculatorButton shape='circle' color='black' text='5' handleClick = {(char) =>handleNumberClick('5')}/>
                <CalculatorButton shape='circle' color='black' text='6' handleClick = {(char) =>handleNumberClick('6')}/>
                <CalculatorButton shape='circle' color='orange' text='-' handleClick={(operations)=>handleOperationClick('-')} />
            </div>
            <div className='button-row'>
                <CalculatorButton shape='circle' color='black' text='1' handleClick = {(char) =>handleNumberClick('1')}/>
                <CalculatorButton shape='circle' color='black' text='2' handleClick = {(char) =>handleNumberClick('2')}/>
                <CalculatorButton shape='circle' color='black' text='3' handleClick = {(char) =>handleNumberClick('3')}/>
                <CalculatorButton shape='circle' color='orange' text='+' handleClick={(operations)=>handleOperationClick('+')}/>
            </div>
            <div className='button-row'>
                <CalculatorButton shape='rectangle'color='black' text='0'/>
                <CalculatorButton shape='circle' color='black' text='.' handleClick = {(char) =>handleNumberClick('.')}/>
                <CalculatorButton shape='circle' color='orange' text='=' handleClick={(expression) => handleEquals(input)} />
            </div>
        </div>
    </div>
  )
}

const CalculatorButton = ( {color, shape , text, handleClick} ) => {
  let text_color
  color === 'gray' ? text_color = 'text-black' : text_color = 'text-white' 
  return (
    <div onClick={handleClick} className={`calculator-button ${color} ${shape} ${text_color}`}>
        <h3 className='button-text'>{text}</h3>
    </div>
  )
}

export default App;
