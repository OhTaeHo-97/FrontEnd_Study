import React from "react";

function Hello({name, color, islover, style}) {
    return(
        // color, name은 직접 줬기 때문에 {color}로 작성(객체가 아니기 때문에 {}를 씌워준 것)
        // (style = {yellow}) == (style = {color: "yellow"})
        <div style = {style ? style : {color}}> 
            안녕하세요
            {islover && <span>♥</span>} {name}님!
            {/* && 조건부 렌더링 방식(true만 있는 삼항 연산자라고 생각하면 됨) */}
            {/* {조건식 ? true : null} == {조건식 && true} */}
        </div>
    )
}

Hello.defaultProps = {
    color: "red",

} // props 값이 없으면 기본값으로 만들어줌

export default Hello;