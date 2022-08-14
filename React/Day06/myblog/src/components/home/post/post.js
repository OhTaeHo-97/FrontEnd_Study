import React, { useCallback, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import Avatar from "./avatar";
import Comment from "./comment";
import CommentForm from "./commentForm";
import {useDispatch} from "react-redux";
import { REMOVE_POST_REQUEST } from "../../../reducer/post";

moment.locale("ko"); // 우리나라 시간을 사용할 수 있음

const Post = ({post}) => {

    const dispatch = useDispatch();
    const [editPost, setEditPost] = useState(false);
    const [commentBox, setCommentBox] = useState(false);

    const onToggleComment = useCallback((e) => {
        e.preventDefault();
        setCommentBox((prev) => !prev);
    }, []);

    const onRemovePost = useCallback(() => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id
        })
    }, []);

    return (
        <StyledPost>
            <div className="info">
                <div className="inner">
                    <Avatar/>
                    <div className="name-date">
                        <div className="name">{post.User.nickname}</div>
                        <div className="date">{moment().format("YYYY.MM.DD")}</div>
                        {/* moment() 안에 날짜 데이터가 들어가면 그것에 해당하는 날짜를, 아무 것도 없다면 현재 날짜를 format()에 있는 포멧에 맞게 나타냄 */}
                    </div>
                </div>
                <div>
                    <button className="editBtn" onClick={() => {
                        setEditPost((prev) => !prev);
                    }}>수정</button>
                    <button className="editBtn" onClick={onRemovePost}>삭제</button>
                </div>
            </div>
            {editPost ? (
                <>
                    <textarea cols="80" row="5"/>
                    <button className="editBtn updateBtn">수정하기</button>
                </>
            ) : (
                <div className="content">내용</div>
            )}
            <div className="comment" onClick={onToggleComment}>
                <div className="total">{post.Comments.length}개</div>
                <div className="commentBtn">댓글 달기</div>
            </div>
            {commentBox && (
                <>
                    <CommentForm/>
                    <Comment comment={post.Comments} postId={post.id}/>
                </>   
            )}
        </StyledPost>
    )
};

export default Post;

const StyledPost = styled.div`
    box-sizing: border-box;
    max-width: 50rem;
    min-width: 18.75rem;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 0.5rem;
    border: 1px solid #ddd;
    padding: 1rem;

    & .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        padding-bottom: 0.6rem;
    }

    & .inner {
        display: flex;
        justify-content: left;
        align-items: center;
    }

    & textarea {
        box-sizing: border-box;
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        resize: none;
        font-size: 0.875rem;
        color: #666;
    }

    & .name-date {
        display: inline-block;
        padding-left: 0.5rem;

        & .name {
            font-size: 0.875rem;
            color: #666;
        }

        & .date {
            font-size: 0.75rem;
            color: #999;
        }
    }

    & .editBtn {
        border: none;
        font-size: 0.75rem;
        color: #666;
        background: none;
        cursor: pointer;
    }

    & .editBtn:hover {
        color: #000;
    }

    & .updateBtn {
        box-sizing: border-box;
        text-align: right;
        padding-bottom: 0.7rem;
        font-weight: bold;
    }

    & .content {
        box-sizing: border-box;
        padding: 1rem 0;
        font-size: 0.875rem;
        color: #666;
    }

    & .comment {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #ddd;
        padding-top: 0.6rem;
        cursor: pointer;
        font-size: 0.75rem;
        color: #999;
    }
`