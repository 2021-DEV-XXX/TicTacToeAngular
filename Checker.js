import React from 'react';



class Checker extends React.Component {
	constructor() {
		super();
		
		
		this.state = {
			columnChecker : new ColumnTriadChecker(),
			rowChecker : new RowTriadChecker(),
			diagonChecker : new DiagonTriadChecker(),
		}
	}
	
	/** This method receives the suite of squares from a board, and the last square which has been played.
		It returns true if the last square is a winning move. */
	isLastMoveAWin(lastMove, squares) {
		return (this.state.columnChecker.check(lastMove, squares)
			|| this.state.rowChecker.check(lastMove, squares)
			|| this.state.diagonChecker.check(lastMove, squares));
		
	}
}
class TriadChecker extends React.Component {
	/** A triad is a suite of three squares, that form either a column, a row, or a diagon.
		The triadChecker, will return true if a triad is consisted of the same non-null value.
		The triadChecker class is considered as abstract. Its method getTriad is not declared. It will be up to its children to define how to get a Triad, depending on the kind of triad they represent (column, row, diagon) */
	constructor() {
		super();
	}
	getTriad;
	
	check(lastMove, squares) {
		var triad = this.getTriad(lastMove, squares);
		if (triad === null)
			return false;
		
		if (
			squares[triad[0]] === squares[triad[1]]
		 && squares[triad[1]] === squares[triad[2]]
		)
			return true;
		return false;
	}
}

class ColumnTriadChecker extends TriadChecker {
	constructor() {
		super();
		this.getTriad = (i) => {
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
	}
}
class RowTriadChecker extends TriadChecker {
	constructor() {
		super();
		this.getTriad = (i) => {
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
	}
}
class DiagonTriadChecker extends TriadChecker {
	constructor() {
		super();
		this.getTriad = (i) => {
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
	}
}

export default Checker;