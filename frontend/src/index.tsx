import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {WordMapProvider} from './components/WordMapProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WordMapProvider>
      <App />
    </WordMapProvider>
  </React.StrictMode>
);

