import React from "react";
// react를 사용하겠다는 뜻
import TodoForm from "../components/TodoForm";
import TodoList from "../components/Todolist";
import Todotitle from "../components/Todotitle";

function Todos() {
    // props
    // property의 약자, 여기서 만든 데이터를 하위 컴포넌트에 전달할 예정
    // Todos 안에 Todotitle, TodoForm, Todolist 3개가 포함되어 있음 -> Todos가 상위 컴포넌트!

    // json 데이터 - key, value 쌍으로 이루어짐
    // 백엔드에서 가져온 정보가 여기에 저장됨
    let state = [
        {
            id: 1,
            Todo: "리액트 공부하기"
        },
        {
            id: 2,
            Todo: "리액트 또 공부하기"
        }
    ];

    return (
        // 두 개를 쓸거면 세그먼트 태그(<></>로 묶어줘야 함)
        <>
            <Todotitle count = {state.length}/>
            <TodoForm/>
            {/* map -> 반복문(state의 길이만큼 for문을 돌린다고 생각하면 됨)(안에 있는 객체의 수만큼 (?)) */}
            {/* state라는 이름으로 넘겨줌 데이터를 넘겨줌(v는 id, Todo를 포함한 하나의 데이터!) */}
            {state.map((v) => (
                <TodoList key = {v.id} state = {v} />
                
            ))}
            {/* 한 번 돌아가면 첫 번째 데이터가 담긴 것 */}
            {/* <TodoList/> */}
        </>
    );
}
export default Todos; // 여기에 있는 이름과 위에 function의 이름이 같아야 함!