import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom"
// import { Provider } from 'react-redux';
// import { store, persistor } from "./reduxStore";
// import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.render(
  <Router>
    <React.StrictMode>
      {/* <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> */}
      <App />
      {/* </PersistGate>
      </Provider> */}
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
