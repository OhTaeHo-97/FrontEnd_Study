import React, { useContext } from "react";
import AddState from "./addState";
import { reducerState } from "../reducer";
import { Context } from "../reducer";

const initialState = [
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
];

const State = () => {
    const {state, dispatch} = useContext(Context); // 전역으로 내려준 것을 이렇게 사용할 수 있다!
    // dispatch -> action 함수를 전달해주는 것

    // const onClickEvent = (id, name) => {
    //     dispatch({ type: "INSERTSTATE", id: id, name: name });
    // };

    const onRemove = (e) => {
        dispatch({ type: "REMOVESTATE", id: parseInt(e.target.value) })
    }

    return (
        <>
            {state.map((p) => (
                <>
                    <div key = {p.id}>
                        {p.id}. {p.name}
                        <button value = {p.id} onClick={onRemove}>삭제</button>
                    </div>
                </>
            ))}
            <AddState />
        </>
    )
}

export default State;