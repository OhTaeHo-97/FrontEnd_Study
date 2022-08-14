import produce from "immer";
import faker from "@faker-js/faker";
import shortId from "shortid"; // 이를 이용하여 랜덤 문자열을 받을 것임

const initialState = {
    allPosts: [
        {
            id: 1,
            User: {
                id: 1,
                nickname: "닉네임1"
            },
            content: "안녕하세요",
            Comments: [
                {
                    User: {
                        // shortId.generate()를 이용하면 랜덤한 문자열을 만들어줌
                        id: shortId.generate(),
                        nickname: "닉네임2"
                    },
                    content: "반갑습니다",
                    id: shortId.generate()
                }
            ]
        }
    ],
    allPostsLoading: false,
    allpostsDone: false,
    allpostsError: null,
    addpostLoading: false,
    addpostDone: false,
    addpostError: null,
    removepostLoading: false,
    removepostDone: false,
    removepostError: null
};

export const LOAD_ALLPOSTS_REQUEST = "LOAD_ALLPOSTS_REQUEST";
export const LOAD_ALLPOSTS_SUCCESS = "LOAD_ALLPOSTS_SUCCESS";
export const LOAD_ALLPOSTS_FAILURE = "LOAD_ALLPOSTS_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const createDummyPost = (number) => 
    Array(number).fill().map(() => ({
        id: shortId.generate(),
        User: {
            id: shortId.generate(),
            nickname: faker.name.findName()
        },
        content: faker.lorem.paragraph(),
        Comments: [
            {
                User: {
                    id: shortId.generate(),
                    nickname: faker.name.findName()
                },
                content: faker.lorem.sentence(),
                id: shortId.generate()
            }
        ]
    })); // array의 숫자만큼 만들어서 매핑을 돌리는 것

const dummyPost = (data) => ({
    id: shortId.generate(),
    content: data.content,
    User: {
        id: 1,
        nickname: "닉네임1"
    },
    Comments: [],
})

// 불변성 지키기 위해 전개 연산자(...)를 사용했었음
// immer를 사용하여 불변성을 지킬 것임
// 전개 연산자 대신 draft를 사용하여 immer를 사용하여 불변성을 자동으로 지킴!
const reducer = (state = initialState, action) => { // action 객체 받으면 reducer가 호출됨
    return produce(state, (draft) => {
        switch(action.type) {
            case LOAD_ALLPOSTS_REQUEST:
                draft.allPostsLoading = true; // draft가 자동으로 규칙을 지켜줌(request를 불러오는 중이니 allpostsLoading을 ture로 함)
                draft.allpostsDone = false;
                draft.allpostsError = null;
                // 로딩 중일 때는 값 초기화!
                break;
            case LOAD_ALLPOSTS_SUCCESS:
                draft.allPostsLoading = false; // draft가 자동으로 규칙을 지켜줌(request를 불러오는 중이니 allpostsLoading을 ture로 함)
                draft.allpostsDone = true;
                draft.allpostsError = action.data.concat(draft.allPosts);
                break;
            case LOAD_ALLPOSTS_FAILURE:
                draft.allPostsLoading = false; // draft가 자동으로 규칙을 지켜줌(request를 불러오는 중이니 allpostsLoading을 ture로 함)
                draft.allpostsDone = false;
                draft.allpostsError = action.error;
                break;
            case ADD_POST_REQUEST:
                draft.addpostLoading = true;
                draft.addpostDone = false;
                draft.addpostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.addpostLoading = false;
                draft.addpostDone = true;
                draft.allPosts.unshift(dummyPost(action.data)); // (?) 가장 상위로 올감감
                break;
            case ADD_POST_FAILURE:
                draft.addpostLoading = false;
                draft.addpostDone = false;
                draft.addpostError = action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removepostLoading = true;
                draft.removepostDone = false;
                draft.removepostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.removepostLoading = false;
                draft.removepostDone = true;
                draft.allPosts = draft.allPosts.filter((v) => v.id !== action.data); // 보내준 id 값 빼고 넣어달라는 것
                break;
            case REMOVE_POST_FAILURE:
                draft.removepostLoading = false;
                draft.removepostDone = false;
                draft.removepostError = action.error;
                break;
            default:
                return state;
        }
    });
}

export default reducer;