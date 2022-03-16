import React from "react";
// react를 사용하겠다는 뜻
import styled from "styled-components";


// styled -> styled-components를 import할 때 styled로 import해옴
// div -> div 역할을 하는 것(Todolist가 div가 되는 것)
// 그렇기 때문에 div 자리에 Todolist를 넣어줌
const Todolist = styled.div`
    background-color: pink;
    margin-top: 10px;
`
const Todolist2 = styled.div`
    background-color: hotpink;
    margin-top: 10px;
`

function TodoList(props) {

    let stateInt;
    if(props.state.id % 2 == 0) { // props.state.id -> id
        stateInt = true;
    } else {
        stateInt = false;
    }

    return (
        <>
            {stateInt? (
                <Todolist2>
                    <span>{props.state.id}. </span>
                    {props.state.Todo}
                    {/* v에 정보가 담겨있는데 state에 id, Todo 값이 있으니 id, Todo 값을 출력 */}
                    <button>완료</button>
                </Todolist2>
            ) : (
                <Todolist>
                    <span>{props.state.id}. </span>
                    {props.state.Todo}
                    {/* v에 정보가 담겨있는데 state에 id, Todo 값이 있으니 id, Todo 값을 출력 */}
                    <button>완료</button>
                </Todolist>
            )}
        </>
    
    // // <div>
    // <Todolist>
    //     <span>{props.state.id}. </span>
    //     {props.state.Todo}
    //     {/* v에 정보가 담겨있는데 state에 id, Todo 값이 있으니 id, Todo 값을 출력 */}
    //     <button>완료</button>
    // </Todolist>
    // // </div>
    );
}
export default TodoList; // 여기에 있는 이름과 위에 function의 이름이 같아야 함!