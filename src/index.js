import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './index.css';


import WeatherAPP from './WeatherApp'

ReactDOM.render(
  <React.StrictMode>
    <WeatherAPP />
  </React.StrictMode>,
  document.getElementById('root')
);

