import React, { useCallback, useEffect } from "react";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import { useInput } from "../../hook/useInput";
import { useDispatch } from "react-redux";
import { LOGIN_REQUEST } from "../../reducer/user";

const LoginMain = () => {

    const dispatch = useDispatch();
    const navigator = useNavigate();
    const [email, onChangeEmail] = useInput("");
    const [password, onChangePassword] = useInput("");

    useEffect(() => {
        if(info) {
            navigator("/"); // info 값이 있으면 info 값이 바뀌고 자동으로 페이지를 이동시켜줄 것임
        }
    }, [info])

    const onlogin = useCallback(() => {
        dispatch({
            type: LOGIN_REQUEST,
            data: {email: email, password: password}
        })
    }, [email, password]);

    return(
        <>
            <LoginTemplate>
                <h1>로그인</h1>
                <div>
                    <label htmlFor="user-email"></label>
                    <input type="text" name="user-email" value={email} onChange={onChangeEmail} placeholder="이메일을 입력해주세요" autoComplete="off" required />
                </div>
                <div>
                    <label htmlFor="user-password"></label>
                    <input type="text" name="user-password" value={password} onChange={onChangePassword} placeholder="비밀번호를 입력해주세요" autoComplete="off" required />
                </div>
                <button onClick={onlogin}>로그인</button>
                <Link to="/register">아직 회원이 아니신가요?</Link>
            </LoginTemplate>
        </>
    );
}

export default LoginMain;

const LoginTemplate = styled.div`
    box-sizing: border-box;
    max-width: 50rem;
    min-width: 8.75rem;
    width: 80%;
    height: 100%;
    margin: 0 auto;
    text-align: center;

    & h1 {
        color: #4f5681;
    }

    & input {
        box-sizing: border-box;
        width: 50%;
        margin: 0.1rem 0;
        padding: 0.35rem;
        border: 1px solid #ddd;
        font-size: 0.875rem;
        color: #666;
    }

    & input::placeholder {
        font-size: 0.875rem;
        color: #ccc;
    }

    & input:focus {
        outline: none;
        border: 1px solid #7784cc;
        box-shadow: 0 0 0 0.1rem rgb(59 65 99/ 25%);
    }

    & button {
        box-sizing: border-box;
        width: 50%;
        margin: 0.2rem;
        padding: 0.3rem 0;
        border: none;
        font-size: 0.875rem;
        color: #fff;
        background: #4f5681;
        cursor: pointer;
    }

    & button:hover {
        background: #3b4163;
    }

    & a {
        display: block;
        font-size: 0.875rem;
        color: #666;
    }
`;

const CheckMessage = styled.p`
    width: 50%;
    margin: 0 auto;
    padding: 0;
    font-size: 0.875rem;
    color: red;
    text-align: left;
`;