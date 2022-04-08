import React, { useCallback, useState, useMemo } from "react";

const Callback = () => {
    const [color, setColor] = useState("red"); // color에는 기본값으로 red라는 값을 줌

    const ChangeColor = useCallback(() => {
        setColor("blue");
        console.log("색깔 변경");
    }, []); // 로직이 바뀌지 않는 이상 이는 재생성되지 않음(만약 함수 안에 변수가 퐇마되어 있으면 바뀔 때가 있으니 그럴 때는 재생성해야 함 -> 이 때는 뒤에 []에 해당 변수를 넣어줌(그러면 그 변수가 바뀔 때 재생성됨))
    // useMemo => 연산된 값을 재사용
    // useCallback => 렌더링 될 때 함수를 재생성하지 않는 것

    return (
        <>
            <div>useCallback</div>
            <input type="text" readOnly value={color} style={{color}}></input>
            <button onClick={ChangeColor}>확인</button>
        </>
    );
};

export default Callback;