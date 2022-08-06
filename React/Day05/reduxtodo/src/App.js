import './App.css';
import AddForm from './components/addForm';
import {useSelector} from "react-redux";

function App() {
  const state = useSelector((state) => state.todo);
  console.log(state);


  return (
    <>
      <h1>할 일 리스트</h1>
      {state.map((v, index) => (
        <div key={index}>{v.id}. {v.todo}</div>
      ))}
      <AddForm state={state}/>
      {/* 이렇게 바로 보낼 수 있는 것들은 props로 보내도 됨 */}
    </>
  );
}

export default App;
