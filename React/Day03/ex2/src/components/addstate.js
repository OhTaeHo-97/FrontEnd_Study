import React, { useState } from "react";

// ?
const AddState = ({ onClickEvent, stateId }) => {
    // 훅 함수 사용시 컴포넌트명 앞 대문자 써줘야 함
    const [name, setName] = useState(""); // name 값을 담아줄 state를 만든 것

    const onClickHandler = () => {
        onClickEvent(stateId + 1, name);
    };

    const onChangeHandler = (e) => {
        setName(e.target.value); // target의 value가 name으로 설정됨
    };
    
    return(
        <>
            <input type="text" value={name} onChange={onChangeHandler} placeholder="이름을 입력하세요"></input>
            <button onClick={onClickHandler}>추가</button>
        </>
    );
};

export default AddState;