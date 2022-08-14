import React, {useState, useCallback} from "react";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import {useInput} from "../../hook/useInput";

const RegsiterMain = () => {

    // 왼쪽 변수 값을 지정해주는 것을 useInput에 만들어놨으므로 useInput()으로 정의 가능
    // email을 보내면 const [value, setValue]가 [email, setEmail]이 되고 아래 handler 부분이 onChangeUserEmail가 된다라고 생각하면 됨
    const [email, onChangeUserEmail] = useInput("");
    const [name, onChangeUserName] = useInput("");
    const [password, onChangeUserPassword] = useInput("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordCheckMessage, setPasswordCheckMessage] = useState(false);

    const onChangeConfirmPassword = useCallback(
        (event) => {
            setConfirmPassword(event.target.value);
            setPasswordCheckMessage(event.target.value !== password);
        }, [password]
    )

    return(
        <>
            <RegisterForm>
                <h1>회원가입</h1>
                <div>
                    <label htmlFor="user-id"></label>
                    <input type="text" name="user-email" placeholder="이메일을 입력해주세요" value={email} onChange={onChangeUserEmail} autoComplete="off" required></input>
                </div>
                <div>
                    <label htmlFor="user-name"></label>
                    <input type="text" name="user-name" placeholder="이름을 입력해주세요" value={name} onChange={onChangeUserName} required></input>
                </div>
                <div>
                    <label htmlFor="user-password"></label>
                    <input type="password" name="user-password" placeholder="비밀번호를 입력해주세요" value={password} onChange={onChangeUserPassword} autoComplete="off" required></input>
                </div>
                <div>
                    <label htmlFor="user-confirm-password"></label>
                    <input type="password" name="user-confirm-password" placeholder="비밀번호를 한 번 더 입력해주세요" value={confirmPassword} onChange={onChangeConfirmPassword} autoComplete="off" required></input>
                </div>
                {passwordCheckMessage && (
                    <CheckMessage>비밀번호가 일치하지 않습니다</CheckMessage>
                )}
                <button>가입하기</button>
                <Link to="/">돌아가기</Link>
            </RegisterForm>
        </>
    );
}

export default RegsiterMain;

const RegisterForm = styled.form`
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