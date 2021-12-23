import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';

toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 5000,
  newestOnTop: true,
  closeButton: false,
});

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

if (window.Cypress || process.env.NODE_ENV === 'development') {
  window.store = store;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
