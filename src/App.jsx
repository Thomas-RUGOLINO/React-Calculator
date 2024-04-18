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
      if(state.overwrite) {
        return {
          ...state,
          currentOperand: payload.number,
          overwrite: false
        }
      }
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

    case ACTIONS.CLEAR:
      return {} 

    case ACTIONS.CALCULATE:
      if(state.currentOperand == null || state.previousOperand == null || state.operation == null) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        currentOperand: calculate(state),
        previousOperand: null,
        operation: null
      }

    case ACTIONS.ADD_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if(state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      if(state.previousOperand == null) {
        return {
          ...state,
          currentOperand: null,
          previousOperand: state.currentOperand,
          operation: payload.operation
        }
      }
      return {
      ...state,
      previousOperand: calculate(state),
      operation: payload.operation,
      currentOperand: null
      }
    case ACTIONS.DELETE_NUMBER:
      if(state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if(state.currentOperand == null) {
        return state;
      }
      if(state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
  }
}
// The calculate function to calculate the result of the operation when equal is pressed or when a new operation is pressed
function calculate(state) {

  let result = "";
  let current = parseFloat(state.currentOperand);
  let previous = parseFloat(state.previousOperand);
  if(isNaN(current) || isNaN(previous)) return "";
  switch(state.operation) {
    case "+":
      result = previous + current;
      break;
    case "-":
      result = previous - current;
      break;
    case "*":
      result = previous * current;
      break;
    case "/":
      result = previous / current;
      break;
    default:
      return state;
  }

  return result.toString();
 }
//The integer formatter to format the result of the operation
 const INTEGER_FORMATTER = new Intl.NumberFormat('fr-FR', {
  maximumFractionDigits: 0
});

//The formatOperand function to format the operands in the output div
function  formatOperand(operand) {
if (operand == null) return 
const [integer, decimal] = operand.split(".");
if (decimal == null) return INTEGER_FORMATTER.format(integer);
return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;

}

//Our App component for the calculator
function App() {

  //Reducer hook to handle the state of the calculator and the actions
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer,{});



  return (
    <div className="calculator-grid">
      {/* The output div to display the current and previous operands */}
        <div className="output">
            <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
            <div className="current-operand">{formatOperand(currentOperand)}</div>
        </div>
        {/* The reset button for the calculator */}
        <button className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          C
        </button>
        <button
        onClick={() => dispatch({ type: ACTIONS.DELETE_NUMBER })}
        >
          DEL
        </button>
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
        <button className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CALCULATE })}
        >
          =
        </button>


    </div>
  )
}

export default App
