
import { useReducer, useState } from "react";

const initialState = {
    count: 0
};

const counterReducer = (state, action) => {
    switch (action.type) {
        case "INC":
            return {
                ...state,
                count: state.count + 1
            };

        case "DEC":
            return {
                ...state,
                count: state.count - 1
            };

        case "RESET":
            return {
                ...state,
                count: 0
            };

        case "SET_COUNT":
            return {
                ...state,
                count: state.count + Number(action.payload)
            };

        default:
            return state;
    }
};

const Counter = () => {
    const [state, dispatch] = useReducer(counterReducer, initialState);
    const [inputData, setInputData] = useState("");

    return (
        <>
            <h2>Count: {state.count}</h2>

            <input
                type="number"
                name="inputdata"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="Enter a number"
            />

            <br /><br />

            <button onClick={() => dispatch({ type: "INC" })}>
                Increment
            </button>

            <button onClick={() => dispatch({ type: "DEC" })}>
                Decrement
            </button>

            <button onClick={() => dispatch({ type: "RESET" })}>
                Reset
            </button>

            <button
                onClick={() => {
                    dispatch({
                        type: "SET_COUNT",
                        payload: inputData
                    });
                    setInputData("");
                }}
            >
                Add Payload
            </button>
        </>
    );
};

export default Counter;
