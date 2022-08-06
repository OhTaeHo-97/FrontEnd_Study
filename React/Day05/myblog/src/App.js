import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        {/* element에는 보여줄 컴포넌트, path는 어떤 주소에 대해서 해당 컴포넌트가 보여질지 설정 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
