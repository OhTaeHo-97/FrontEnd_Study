export const reducer = function reducer(state, action) {
    switch(action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREAMENT":
            return state - 1;
        default:
            return state;
    }
};

export const reducerState = function reducer(state, action) {
    switch(action.type) {
        case "INSERTSTATE":
            return [...state, { id: action.id, name: action.name }];
        case "REMOVESTATE":
            return state.filter((item) => item.id !== action.id);
        default:
            return state;
    }
}

export const addReducer = function reducer(state, action) {
    switch(action.type) {
        case "Change":
            state = action.name;
            break;
        case "Add":

    }
}

// export default -> 이 파일 전체를 내보냄
// export const -> 하나만 내보냄