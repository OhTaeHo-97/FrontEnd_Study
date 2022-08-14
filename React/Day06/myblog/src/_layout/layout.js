import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Layout = ({children}) => {
    return (
        <>
            <StyledNav>
                <div>
                    <Link to="/">
                        <span>MyBlog</span>
                    </Link>
                </div>
                <div>
                    <Link to="/register">
                        회원가입
                    </Link>
                </div>
                <div>
                    <Link to="/login">
                        로그인
                    </Link>
                </div>
                <StyledInfo>
                    태호님 | <button> 로그아웃 </button>
                </StyledInfo>
            </StyledNav>
            <div>{children}</div>
        </>
    );
    // Link가 a 태그로 인식됨, 그래서 아래에서 a 태그에 대한 스타일을 적용했음
}

export default Layout;

const StyledNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    max-width: 50rem;
    min-width: 18.75rem;
    width: 80%;
    margin: 0 auto;
    padding: 1rem 0;

    & a { // & -> 자기 자신 선택자(즉 여기서는 StyledNav)
        padding-top: 0.3rem;
        text-decoration: none;
        font-size: 0.875rem;
        color: #666;
    }

    & span {
        font-size: 1.5rem;
        font-weight: 900;
        color: #4f5681;
    }
`;

const StyledInfo = styled.div`
    font-size: 0.875rem;
    color: #666;
    cursor: default;

    & button {
        border: none;
        padding-top: 0.3rem;
        font-size: 0.875rem;
        color: #666;
        background: none;
        cursor: pointer;

        :hover { // button에 대한 hover를 말함
            color: #000;
        }
    }
`;