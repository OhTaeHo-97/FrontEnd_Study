import React from "react"
import { useInput } from "../../../hook/useInput";
import styled from "styled-components";

const CommentForm = () => {
    
    const [comment, onChangeComment] = useInput("");

    return (
        <StyledForm>
            <input type="text" placeholder="댓글을 남겨주세요" value={comment} onChange={onChangeComment}></input>
            <button>등록</button>
        </StyledForm>
    )
}

export default CommentForm;

const StyledForm = styled.form`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;

    & input {
        box-sizing: border-box;
        width: 90%;
        padding: 0.2rem;
        border: 1px solid #ddd;
        color: #666;
    }

    & input::placeholder {
        color: #ccc;
    }

    & input:focus {
        outline: none;
        border: 1px solid #7784cc;
        box-shadow: 0 0 0 0.1rem rgb(59 65 99/ 25%);
    }

    & button {
        box-sizing: border-box;
        width: 10%;
        padding: 0.2rem;
        border: none;
        font-size: 0.875rem;
        color: #fff;
        background: #4F5681;
        cursor: pointer;
    }

    & button:hover {
        background: #3b4163;
    }
`;