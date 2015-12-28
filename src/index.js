import React from 'react';
import { render } from 'react-dom';
import { App } from './App';

function what() {
  console.log('what');
}

what();

render(<App />, document.getElementById('root'));
