import { ACTIONS } from "./App"
import PropTypes from "prop-types";

export default function NumberButton({ dispatch, number }) {
    return (
        <button
            onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: { number } })}
        >
            {number}
        </button>
    )
}

NumberButton.propTypes = {
    dispatch: PropTypes.func.isRequired,
    number: PropTypes.string.isRequired
};
