import './App.css';
import Hello from "./components/hello";

function App() {
  const user = "오렌지";
  const style = {
    color: "deepskyblue"
  };

  return (
    <>
      {/* props로 name과 color라는 이름으로 보내준 것, style은 style이란 이름으로, islover는 아무 값 없이 보내준 것 */}
      <Hello name = "김사과"/>
      <Hello name = "반하나" color = "yellow"/>
      <Hello name = {user} style = {style} islover/>
    </>
  );
}

export default App;
