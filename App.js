import React from 'react';
import './App.css';
import Board from './Board.js';

function App() {
  return (
    <div className="App">
		<header className="App-header">
			<h1>Tic Tac Toe</h1>
		</header>
		<Board/>
    </div>
  );
}

export default App;
