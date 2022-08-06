import { combineReducers } from "redux"; // 비구조 할당(redux 안에 있는 combineReducers 객체를 가져온 것)
import todo from "./todo";

// 여러 개의 reducer들을 rootReducer로 합치는 작업(reducer를 하나로 합쳐주는 것)(최상위 reducer라는 뜻)
const rootReducer = combineReducers({
    todo,
});

export default rootReducer;