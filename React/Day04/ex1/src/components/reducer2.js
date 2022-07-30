import React, {useReducer, useState} from "react";
import AddState from "./addstate";
import { reducerState } from "../reducer";

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
    const [state, dispatch] = useReducer(reducerState, initialState);

    const onClickEvent = (id, name) => {
        dispatch({ type: "INSERTSTATE", id: id, name: name });
    };

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
            <AddState onClickEvent={onClickEvent} stateId={state[state.length - 1].id}/>
        </>
    )
}

export default State;