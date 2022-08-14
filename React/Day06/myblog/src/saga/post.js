import {all, delay, fork, put, takeLatest} from "redux-saga/effects";
import { LOAD_ALLPOSTS_REQUEST, LOAD_ALLPOSTS_SUCCESS, LOAD_ALLPOSTS_FAILURE, createDummyPost, ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE } from "../reducer/post";

/*
    백데이터와의 통신
    function LoadPostsAPI(data) {
        return axsios.get("/api/posts", data); // 백서버에 api/posts(url) 이런 요청을 보내면 데이터를 보내달라는 뜻
    }
*/

function* loadposts(action) {
    try {
        // const result = yield call(LoadPostsAPI, action.data); // 백데이터와의 통신
        yield delay(1000); // 백데이터와 통신할 때는 시간이 걸리기 때문에 delay를 일부러 넣어줬음(대략 이 정도 시간이 걸리는 백데이터 통신이 있다라고 명시해주는 것)
        yield put({
            // LOAD_ALLPOSTS_SUCCESS이 오면 데이터에 action.data로 createDummyPost(10)을 보내는 것
            type: LOAD_ALLPOSTS_SUCCESS,
            data: createDummyPost(10)
        })
    } catch(err) {
        console.log(err);
        yield put({
            type: LOAD_ALLPOSTS_FAILURE,
            data: err.response.data
        })
    }
}

function* addPost(action) {
    try {
        yield delay(1000);
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                content: action.data
            }
        })
    } catch(err) {
        console.log(err);
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data
        })
    }
}

function* removePost(action) {
    try {
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: {
                content: action.data
            }
        })
    } catch(err) {
        console.log(err);
        yield put({
            type: REMOVE_POST_FAILURE,
            data: err.response.data
        })
    }
}

// generate 함수를 쓰기 위해서는 function 뒤에 * 필요
function* watchLoadPosts() {
    yield takeLatest(LOAD_ALLPOSTS_REQUEST, loadposts); // yield: await과 같음(이것을 하고 다음 것을 진행하라는 뜻)(첫 번째 인자가 오면 두 번째 함수를 실행시키라는 뜻)(eventListener와 비슷한 개념)
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

// REQUEST 요청이 오면 saga와 reducer가 같이 켜져서 request 요청이 왔을 때 loadposts를 실행시키는데 REQUEST 잘 받아와서 성공하면 SUCCESS가 실행이 될 것이고 실패하면 FAIILURE가 실행됨

export default function* postSaga() {
    yield all([
        fork(watchLoadPosts), fork(watchAddPost), fork(watchRemovePost) // all 및 fork는 등록하겠다는 뜻
    ]);
}