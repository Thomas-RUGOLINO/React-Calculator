import { useReducer } from 'react'
import NumberButton from './NumberButtons';
import OperationButton from './OperationButtons';
import "./App.css";


// Let's list the actions that our reducer will handle:
// eslint-disable-next-line react-refresh/only-export-components
export const ACTIONS  ={
  ADD_NUMBER: 'add-number',
  DELETE_NUMBER: 'delete-number',
  CLEAR: 'clear',
  ADD_OPERATION: 'add-operation',
  CALCULATE: 'calculate'


}
//Our reducer which will handle the actions that our calculator will perform
function reducer(state, { type, payload }) {

  switch(type) { 
    case ACTIONS.ADD_NUMBER:
      if(payload.number === "0" && state.currentOperand === "0") {
        return state;
      }
      if(payload.number === "." && state.currentOperand.includes(".")) {
        return state
      }
      
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.number}`
        }
  }
}

//Our App component for the calculator
function App() {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer,{});



  return (
    <div className="calculator-grid">
        <div className="output">
            <div className="previous-operand">{previousOperand} {operation}</div>
            <div className="current-operand">{currentOperand}</div>
        </div>
        <button className="span-two">C</button>
        <button>DEL</button>
        <OperationButton operation="/" dispatch={dispatch}/>
        <NumberButton number="7" dispatch={dispatch}/>
        <NumberButton number="8" dispatch={dispatch}/>
        <NumberButton number="9" dispatch={dispatch}/>
        <OperationButton operation="*" dispatch={dispatch}/>
        <NumberButton number="4" dispatch={dispatch}/>
        <NumberButton number="5" dispatch={dispatch}/>
        <NumberButton number="6" dispatch={dispatch}/>
        <OperationButton operation="+" dispatch={dispatch}/>
        <NumberButton number="1" dispatch={dispatch}/>
        <NumberButton number="2" dispatch={dispatch}/>
        <NumberButton number="3" dispatch={dispatch}/>
        <OperationButton operation="-" dispatch={dispatch}/>
        <NumberButton number="0" dispatch={dispatch}/>
        <NumberButton number="." dispatch={dispatch}/>
        <button className="span-two">=</button>


    </div>
  )
}

export default App
