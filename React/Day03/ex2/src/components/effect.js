import React, { useState, useCallback, useEffect } from "react";

const Effect = () => {
    const [color, setColor] = useState("red");

    useEffect(() => {
        console.log("색이 변경되었습니다.")
    }, [color]); // color 값이 바뀌었을 때 이러한 이벤트를 함

    useEffect(() => {
        console.log("시작합니다.")
    }, []); // []가 비어있다면 마운트 시에 동작

    const ChangeColor = useCallback(() => {
        setColor("blue");
    }, []);

    return (
        <>
            <div>useEffect</div>
            <input type="text" readOnly value={color} style={{color}}></input>
            <button onClick={ChangeColor}>확인</button>
        </>
    );
}

export default Effect;