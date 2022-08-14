import produce from "immer";

const initialState = {
    info: null,
    loginLoading: false,
    loginDone: false,
    loginError: null
}

const dummyUser = (data) => ({
    ...data,
    nickname: "닉네임1",
    id: 1,
    Posts: [
        {id: 1}
    ] // 내가 쓴 게시글들의 id값이 들어가있는 공간
});

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch(action.type) {
            case LOGIN_REQUEST:
                draft.loginLoading = true;
                draft.loginDone = false;
                draft.loginError = null;
                break;
            case LOGIN_SUCCESS:
                draft.loginLoading = false;
                draft.loginDone = true;
                draft.info = dummyUser(action.data);
                break;
            case LOGIN_FAILURE:
                draft.loginLoading = false;
                draft.loginError = action.error;
                break;
        }
    })

export default reducer;