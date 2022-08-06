import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// redux 설정
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducer";

// redux 강화
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
