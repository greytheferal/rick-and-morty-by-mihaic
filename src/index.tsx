import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import 'styles/global.scss'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/character/:id' element={<Detail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app')
);
