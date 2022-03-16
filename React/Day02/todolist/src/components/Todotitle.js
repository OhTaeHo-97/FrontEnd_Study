import React from "react";
// react를 사용하겠다는 뜻

function Todotitle(count) {
    console.log(count.count); // count.count -> length가 나옴
    return (
    // react로 개발 시에 class를 막 만들어냄 -> 그래서 className으로 이름을 정함
    // className을 줘서 App.css에서 css를 통해 꾸밀 수 있음
    <div className = "navbar">
            할 일 목록 리스트 <span>{count.count}</span>개
    </div>);
}
export default Todotitle; // 여기에 있는 이름과 위에 function의 이름이 같아야 함!