import React, { useReducer } from 'react';
import { reducer } from "../reducer";

const initialState = 0;

const Reducer = () => {
    const [number, dispatch] = useReducer(reducer, initialState); // 초기값(initialState)이 reducer의 state에 전달됨(reducer 자리에는 로직 처리하는 함수가 들어가 있어야 하고 initialState 자리에는 초기값이 들어감)
    
    // const PlusOneEvent = useCallback(() => {
    //     setNumber(number + 1);
    // }, [number]);

    // const MinusOneEvent = useCallback(() => {
    //     setNumber(number - 1);
    // }, [number]);

    const oneIncrease = () => {
        dispatch({ type: "INCREMENT" });
    }

    const oneDecrease = () => {
        dispatch({ type: "DECREAMENT" }); // dispatch() 안에 있는 데이터들이 모두 reducer의 action에 전달됨
    }

    return (
        <>
            <div>
                <p>{number}</p>
                <button onClick={oneIncrease}>+</button>
                <button onClick={oneDecrease}>-</button>
            </div>
        </>
    )
}

export default Reducer;