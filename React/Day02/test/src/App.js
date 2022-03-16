import './App.css';
import Todos from './pages/Todos';

function App() {
  return <Todos/>; // Todos를 return 값에 넣음
}
// localhost:3000/todos => <Todos/>
// localhost:3000/myinf -> <Myinfo/>
// Todos를 import해서 만든 것
// router 이용하면 Todos 찾아서 Todos에서 검색하게 되면 어떤 컴포넌트 해달라 이렇게 주소 요청이 들어왔을 때 어떤 component를 보여줄지 (?) 그 화면에서는 그 컴포넌트들로 이루어진 페이지를 보여주게 됨

export default App;