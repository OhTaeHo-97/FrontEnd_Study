import React, { useState, useRef, useContext } from "react";
import { Context } from "../reducer";

// ?
const AddState = () => {
    const {state, dispatch} = useContext(Context); // 이런 식으로 내려준 state를 가져올 수 있고 내려준 dispatch를 사용할 수 있음!
    // 전역으로 사용할 수 있기 때문에 더 이상 props로 넘겨주지 않아도 state 값을 우리가 원하는대로 바꿀 수 있다!

    const [name, setName] = useState("");
    const userName = useRef();

    const onClickHandler = () => {
        dispatch({ type: "INSERTSTATE", id: parseInt(state[state.length - 1].id) + 1, name: name });
    };

    const onChangeHandler = (e) => {
        setName(e.target.value);
    };

    const onReset = () => {
        setName("");
        userName.current.focus();
    }
    
    return(
        <>
            <input type="text" value={name} onChange={onChangeHandler} placeholder="이름을 입력하세요" ref={userName}></input>
            {/* 속성값에 ref 선언한 변수값을 넣어주면 userName으로 객체에 접근할 수 있음 */}
            <button onClick={onClickHandler}>추가</button>
            <button onClick={onReset}>초기화</button>
        </>
    );
};

export default AddState;