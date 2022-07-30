import React, { useReducer } from "react";

export const Context = React.createContext(); // Context API 사용하기 위해 선언하는 부분

const initialState = [
    {
        id: 1,
        name: "김사과"
    },
    {
        id: 2,
        name: "반하나"
    },
    {
        id: 3,
        name: "두리안"
    }
];
// 여기서 initialState를 관리하기 때문에 어디서든 이를 가져다 사용할 수 있음

export const reducer = (state, action) => {
    switch(action.type) {
        case "INSERTSTATE":
            return [...state, { id: action.id, name: action.name }];
        case "REMOVESTATE":
            return state.filter((item) => item.id !== action.id);
        default:
            return state;
    }
};

const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>
        // dispatch -> action 넘겨주는 함수
        // 전체한테 이를 다 보내주려고 한다면 최상위 컴포넌트인 App.js에 이를 이용
        // state, dispatch를 전역에 내려줌!(즉, reducer와 initialState를 전역에 내려줌!)
    )
}

export default ContextProvider;