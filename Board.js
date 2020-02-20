import React from 'react';

import './Board.css';
import Square from './Square.js';
import Checker from './Checker.js';


class Board extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			squares: Array(9).fill(),
			isPlayerOneNext : true, // true if it's player one's turn. false if player 2 is next to play
			gameIsWon: false,
			checker: new Checker(),
		}
	}
	
	currentPlayerMark() {
		return this.state.isPlayerOneNext ? 'X' : 'O';
	}
	
	
	toogleTurn() {
		this.setState({isPlayerOneNext : !this.state.isPlayerOneNext});
	}
	
	
	handleClickOnSquare(i) {
		// check that this square was never played before and that the game isn't won yet
		if (this.state.squares[i] || this.state.gameIsWon)
			return;
		
		var squares = this.state.squares;
		
		// edit of the value of the square
		squares[i]= this.currentPlayerMark();
		
		
		this.setState({
			squares : squares,
		});
		//if (this.playerWins(i))
		if (this.state.checker.isLastMoveAWin(i, this.state.squares))
			this.setState({
				gameIsWon: "Player " + this.currentPlayerMark() + " wins!",
			});
		else this.toogleTurn();
	}
	
	
	/*
	getColumnTriad(i) {
		var triad;
		switch(i) {
			case 0:
			case 3:
			case 6:
			triad = [0, 3, 6]
			break;
			case 1:
			case 4:
			case 7:
			triad = [1, 4, 7]
			break;
			case 2:
			case 5:
			case 8:
			triad = [2, 5, 8]
			break;
		}
		return triad;
	}
	
	getRowTriad(i) {
		var triad;
		switch(i) {
			case 0:
			case 1:
			case 2:
			triad = [0, 1, 2]
			break;
			case 3:
			case 4:
			case 5:
			triad = [3, 4, 5]
			break;
			case 6:
			case 7:
			case 8:
			triad = [6, 7, 8]
			break;
		}
		return triad;
	}
	
	getDiagonTriad(i) {
		var triad;
		switch(i) {
			case 0:
			case 4:
			case 8:
			triad = [0, 4, 8]
			break;
			case 2:
			case 4:
			case 6:
			triad = [2, 4, 6]
			break;
			default:
			triad = null
		}
		return triad;
	}
	
	// Check that the states of the three cells are the same. The input function is the function to get the triad *
	checkTriad(i, getTriad) {
		var triad = getTriad(i);
		if (triad === null)
			return false;
		
		if (
			this.state.squares[triad[0]] === this.state.squares[triad[1]]
		 && this.state.squares[triad[1]] === this.state.squares[triad[2]]
		)
			return true;
		return false;
	}
	
	
	playerWins(lastPlayedIndex) {
		return (this.checkTriad(lastPlayedIndex, this.getColumnTriad)
			|| this.checkTriad(lastPlayedIndex, this.getRowTriad)
			|| this.checkTriad(lastPlayedIndex, this.getDiagonTriad));
	}
	*/
	
	renderOneSquare(i) {
		return (
			<Square
				value={this.state.squares[i]}
				onClick={() => this.handleClickOnSquare(i)}
			/>
		);
	}
	render() {
		return (
			<div className="TicTacToeApp">
				<header className="App-header">
					<h1>Tic Tac Toe</h1>
				</header>
				<div className="Board">
					<div className="row">
						{this.renderOneSquare(0)}
						{this.renderOneSquare(1)}
						{this.renderOneSquare(2)}
					</div>
					<div className="row">
						{this.renderOneSquare(3)}
						{this.renderOneSquare(4)}
						{this.renderOneSquare(5)}
					</div>
					<div className="row">
						{this.renderOneSquare(6)}
						{this.renderOneSquare(7)}
						{this.renderOneSquare(8)}
					</div>
					<div class="winnerAnnonce">{this.state.gameIsWon}</div>
				</div>
			</div>
		);
	}
}

export default Board;
