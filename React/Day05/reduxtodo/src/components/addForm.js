import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { INSERT_TODO } from "../reducer/todo";

const AddForm = ({state}) => {
    const [todo, setTodo] = useState("");
    const dispatch = useDispatch(); // useDispatch를 dispatch라는 이름으로 사용하려고 함

    const onChangeHandler = (e) => {
        setTodo(e.target.value);
    }

    const onClickHandler = () => {
        dispatch({
            type: INSERT_TODO,
            data: {id: state[state.length - 1].id + 1, todo: todo} // action에 타입과 데이터를 보낼 것임
        }); // reducer의 action으로 감(type과 data가)
    }

    return (
        <>
            <input type="text" placeholder="할 일을 적어주세요" value={todo} onChange={onChangeHandler}></input>
            <button onClick={onClickHandler}>추가</button>
        </>
    );
}

export default AddForm;