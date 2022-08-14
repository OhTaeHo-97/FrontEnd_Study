import {all, delay, fork, takeLatest, put} from "redux-saga/effects";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../reducer/user";


function* login(action) {
    try {
        yield delay(1000);
        yield put({
            type: LOGIN_SUCCESS,
            data: action.data
        })
    } catch(err) {
        console.log(err);
        yield put({
            type: LOGIN_FAILURE,
            data: err.response.data
        })
    }
}

function* watchLogin() {
    yield takeLatest(LOGIN_REQUEST, login); // yield에 포함되어 있는 문장이 실행될 때까지 멈춤
}

export default function* userSaga() {
    yield all ([fork(watchLogin)]);
}