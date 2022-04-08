import React, {useState} from "react"; // react 기능 안에 useState라는 기능이 있음, react 객체 안에 있는 것이니 이를 갖다 쓰겠다는 뜻으로 {useState} 를 작성 => react에서 지원하는 Hooks 함수인 useState 사용할 수 있음
import AddState from "./addstate";

// function State() {} == const State = () => {}
const State = () => {
    // const [변수명, 변수값을 바꿔줄 함수명] = useState(변수 기본값)
    // const [state, setState] = useState("state 처음 시작"); // setState가 state의 값을 변경해줄 것임

    // setState -> state의 상태를 변경하는 함수
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
    ]);

    const onClickEvent = (id, name) => {
        setState("안녕하세요"); // 이렇게 쓰면 useState([]) 안에 있는 값들이 다 날아갈 것임
        setState([...state, {id: id, name: name}]) // state를 먼저 다 복사한 후에 id와 name을 객체를 통하여 추가해줌
        // ... -> 전개 연산자
        // ...state -> state를 복사하는 것
    };

    /*
        state의 불변성
        
        const obj = {}
        const obj2 = {}
        const obj3 = const obj // obj와 같은 참조값을 지님

        따라서 obj가 가지고 있는 객체값이 변경되면 obj3도 같은 객체를 가지기 때문에 값이 공유된다.
        즉, 데이터 원본 훼손 이러한 훼손은 예상치 못한 오류와 버그를 발생

        state값이 영구 훼손되면 바뀐지 못찾음(state = new State -> new State가 되버리면 바뀐 것을 찾지 못하기 때문에 불변성을 지켜주는 것!)

        불변성 지기키 위한 방법
        1. spread operator(전개연산자)
            -> ...

        2. immer.js
            -> draft.state 라이브러리(리덕스 사용 시에 사용할 예정)
            -> ...을 한 번에 해결해줄 것을 만든 것
            -> set(...state, {id: id, name: name})
            -> draft.state = concat(draft) // 이렇게 위 문장을 쉽게 표현할 수 있음
    */

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
            <AddState onClickEvent={onClickEvent} stateId={state[state.length - 1].id}/>
        </>
    )
}

export default State;