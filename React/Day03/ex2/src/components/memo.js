import React, { useState, useMemo } from "react";

const Memo = () => {
    const [color, setColor] = useState("red"); // color에는 기본값으로 red라는 값을 줌
    const [text, setText] = useState("");

    // const getColor = () => {
    //     console.log(`색은 ${color}입니다.`);
    // }

    // const getText = () => {
    //     console.log("텍스트는 실행하지 않습니다.");
    // }

    const getColor = useMemo(() => console.log(`색은 ${color}입니다.`), [color]); // color 값이 바뀔 때마다 앞에 console.log() 를 실행!
    const getText = useMemo(() => console.log("텍스트는 실행하지 않습니다."), [text]);

    const ChangeColor = () => {
        setColor("blue");
    };

    return (
        <>
            <div>useMemo</div>
            <input type="text" readOnly value={color} style={{color}}></input>
            <button onClick={ChangeColor}>확인</button>
        </>
    );
};

export default Memo;