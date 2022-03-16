import React, {useState} from "react"; // react 기능 안에 useState라는 기능이 있음, react 객체 안에 있는 것이니 이를 갖다 쓰겠다는 뜻으로 {useState} 를 작성 => react에서 지원하는 Hooks 함수인 useState 사용할 수 있음
import AddState from "./addstate";

// function State() {} == const State = () => {}
const State = () => {
    // const [변수명, 변수값을 바꿔줄 함수명] = useState(변수 기본값)
    // const [state, setState] = useState("state 처음 시작"); // setState가 state의 값을 변경해줄 것임

    const [state, setState] = useState([
        {
            id: 1,
            name: "김사과"
        },
        {
            id: 2,
            name: "반하나"
        },
        {
            id: 3,
            name: "두리안"
        }
    ])

    return (
        <>
            {state.map((p) => (
                <>
                    <div key = {p.id}>
                        {p.id}. {p.name}
                        <button value = {p.id}>삭제</button>
                    </div>
                </>
            ))}
            <AddState/>    
        </>
    )
}

export default State;