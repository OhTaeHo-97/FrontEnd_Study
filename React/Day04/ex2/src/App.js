import './App.css';
import State from "../src/components/context";
import ContextProvider from './reducer';

function App() {
  return (
    <ContextProvider>
      <State/>
    </ContextProvider>
    // 내려주는 모듈을 만들고 그 모듈을 export해서 사용한 것!
  );
}

export default App;
