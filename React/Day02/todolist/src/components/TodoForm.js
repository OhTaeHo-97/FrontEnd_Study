import React from "react";
// react를 사용하겠다는 뜻
import styled from "styled-components";

const TodoaddInput = styled.input`
    border-radius: 5px;
    width: 500px;
    font-size: 2rem;
    position: relative;
    padding-left: 20px;
`

const TodoaddButton = styled.button`
    border-radius: 5px;
    width: 53px;
    height: 43px;
    vertical-align: middle;
    position: absolute;
`

function TodoForm() {
    return (
    <form>
        {/* <input type = "text" placeholder = "할 일을 적어주세요"/> */}
        <TodoaddInput type = "text" placeholder = "할 일을 적어주세요"/>
        {/* <button>추가</button> */}
        <TodoaddButton>추가</TodoaddButton>
    </form>);
}
export default TodoForm; // 여기에 있는 이름과 위에 function의 이름이 같아야 함!