import { ACTIONS } from "./App"
import PropTypes from "prop-types";

export default function OperationButton({ dispatch, operation }) {
    return (
        <button
            onClick={() => dispatch({ type: ACTIONS.ADD_OPERATION, payload: { operation } })}
        >
            {operation}
        </button>
    )
}

OperationButton.propTypes = {
    dispatch: PropTypes.func.isRequired,
    operation: PropTypes.string.isRequired
};
