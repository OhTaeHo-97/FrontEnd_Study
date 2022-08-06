// state 기본값
const initialState = [
    {
        id: 1,
        todo: "리엑트 공부하기"
    },
    {
        id: 2,
        todo: "리엑트 또 공부하기"
    }
];

// 액션 타입명
// 오타를 막기 위해 const로 정의함
export const INSERT_TODO = "INSERT_TODO";

// 타입명에 의한 상태 관리 로직 정의
// dispatch로 보낸 갑싱 action으로 감
const todo = (state = initialState, action) => {
    switch(action.type) {
        case INSERT_TODO:
            console.log(action);
            return state.concat({ id: action.data.id, todo: action.data.todo});
        default:
            return state;
    }
}

export default todo;