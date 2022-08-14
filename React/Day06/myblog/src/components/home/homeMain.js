import React,{useEffect, useState} from "react";
import styled from "styled-components";
import PostForm from "./post/postForm";
import Post from "./post/post";
import {useSelector, useDispatch} from "react-redux";
import { LOAD_ALLPOSTS_FAILURE, LOAD_ALLPOSTS_REQUEST } from "../../reducer/post";

const HomeMain = () => {
    const dispatch = useDispatch();
    const {allPosts} = useSelector((state) => state.post);

    console.log(allPosts);

    useEffect(() => {
        dispatch({
            type: LOAD_ALLPOSTS_REQUEST
        });
    }, []);

    return (
        <StyledWrap>
            <PostForm/>
            {allPosts && allPosts.map((post) => <Post key={post.id} post={post}/>)}
        </StyledWrap>
    );
}

export default HomeMain;

const StyledWrap = styled.div`
    box-sizing: border-box;
    max-width: 50rem;
    min-width: 18.75rem;
    width: 80%;
    height: 100%;
    margin: 0 auto;
`;