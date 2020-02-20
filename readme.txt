TicTacToe app


This app is entirely developped in Javascript, using the library/framework React. There is no back-end part, therefore front-end takes charge of the graphical display and the calculation.

The React code is structured into three main classes: Board, Square and Checker. At first I thought the Board would be no more than a collection of Square object and would simply make sure all nine squares are correctly implemented and displayed, while Square would be in charge of its own behaviour (setting itself as checked when the player clicks on it, manage to display the right symbol between 'X' and 'O'), as it would be closer to a logic of encapsulation.

But it quickly came to my mind that it was adding unnessary complexity and and dirtiness to the code, since a Square must be aware of the value of all its fellow squares to check if the game is won, and that if a square needed to know which turn it was (in order to decide whether to display 'X' or 'O') and that this information, though very simple (consisting in a boolean), could not reasonably be sent to all squares and constantly kept synchronized from each instance of Square.

Therefore I chose to let the Board manage all the bahavior, and to use Square for nothing but the mere rendering of the DOM and the graphical aspects of a square (if we were to improve the graphical design to make pretty coloured squares depending on its content, with animated content, zoom-in effects, etc., the Square level (its js class and its css file) would be the place to implement it).

Thus, we have a Board class, which will be used as a singleton (although there is no specific code to prevent a multiple instanciation of the class)
This board class has as attributes:
- squares: an array of nine Square instances
- isPlayerOneNext: a boolean to keep track of which player is to play next (true is player one ('X') is to play, false otherwise). Once the game is won, this attribute is left unchanged, so it can be understood as a which-player-has-won (true for player one, false for player two)
- isGameWon: a string with the message to display when one of the players has won the game. Since it is null until the game is won, it can be used as a boolean. Its null value indicates that nobody won, a non-null value indicates that until the game is won (it remains false is the game finishes without a winner)
- checker: an instance of the Checker class, used for checking if the game is won

Beside the rendering functions, the board class has several methods:
- currentPlayerMark() automaticaly returns the mark 'X' or 'O', depending on which player is to play next or currently playing. This used to display its mark on the board or to announce the winner at the end of the game.
- toogleTurn() simply change the value of the boolean isPlayerOneNext. It is invoked at the end of one's turn.
These two methods were not necessary to get the code work, but they bring a more functionnal layer to the Board class. I tend to dislike having to edit the attributes of a class from the high-level methods that describe the main behaviour of the class. To me, a well-coded object-oriented code implements this interface layer that makes a bridge between a simple action to change a state of the object, and the basic instructions to change its attributes, depending on how they are declared.

The most important method of this Board class is the following one:
- handleClickOnSquare(): this is a method invoked by each square once it is clicked on. This describe the behaviour of both the square and the board at each turn. The logic is the following:
1. We check that the square was empty (as one cannot play on a previously-played square)
2. We check that the game is not won yet (logicaly, we should check wether the game is finished or not, not if it's won or not. But a game that would finished but not won would have a oard completely filled, so it would not be possible to play in an empty square anyway).
3. If at least one of these two tests returns true, we escape the method. Nothing more happens. If both are false, we continue to the following newt steps:
4. We make a local copy of the state of all squares in the board. This is a best practice that would have several advantages in a bigger application. Here, it simply makes it easier to edit the state of the board later in this method
5. We edit the value of the current square, with the value obtained by the method currentPlayerMark()
6. We check if this new move made the player to win the game. This will be explained with more details later.
7. If the game is won, we update the value isGameWon, with a message announcing the winner
8. If it isn't won, we toggle the current player.

Last but not least, the third part of the code, Checker is the tool that checks if the game is won. We do not need to check it for each of the board columns, rows and diagon, but only for those who include the square which was the players's last move (since obviously, if any other column that doesn't include this last move were a winning column, the game would be already won and the last move could not have happened). Therefore, Checker is a tool that requires the state of the nine squares, and the last coup (if we were to make it perfect, we would implement a solution to do the calculation if the last move isn't given as an input when we call the checker. That would simply be to simulate a move on the following cells: 0, 4, 8, as with those three cells we include every columns, rows and diagon).
Checker is used as a singleton (although there is no specific code to prevent a multiple instanciation of the class). It has only one method: isLastMoveAWin(). This is the main entry for Board to make use of the Checker tool. It takes the squares attribute from Board, and the index of the last-played squared. It simply returns true if the last move was a winning move, false otherwise.
The Checker tool has three attributes:
- a column checker
- a row checker
- a diagon checker
When we invoke the method isLastMoveAWin(), all of these three checkers are invoked. If at least one of them returns true (meaning that the last move has completed the column, the row or/and the diagon which it was included in), then isLastMoveAWin() returns true. Otherwise, it returns false.
Each one is an instanciation of the corresponding of these three class: ColumnTriadChecker, RowTriadChecker, DiagonTriadChecker. Each of these being herited from the meant-to-be-abstract class TriadChecker. The three herited classes have the same behavior, described in their mother class TriadChecker:
1. it calls the abstract method getTriad, to find the index of the triad to check. Each inherited class has its own version of getTriad. Therefore, depending on its class, it would return:
- the index of the three squares of this column in the case of a ColumnTriadChecker,
- the index of the three squares of this row in the case of a RowTriadChecker
- otherwise the index of the squares of the diagon.
2. it checks that the triad is not null (since it is expected to be null in the case of a DiagonTriadChecker, if the square is not included in the two big diagons). If the triad is null, this triad is obviously not checked and we return false for this triad. This doesn't change anything to the checking of other triads (the column and the row for example)
3. it check that each square of this triad contains the same non-null value. If it does, it returns true, meaning that the game is won. If not, it returns false, which doesn't necessarily implies that the game isn't won, as it can be won by another of the three triad to inspect.

This last part (the Checking tool) was originaly meant to simply be a function in the Board class. Remains of this old version are still visible, for the more curious ones. But it seems to me to be a lot cleaner by separating this whole code focused on a specific task, from the main code of the board. This being a series of separated classes made it possible to use inheritance, which made the factorization of the Column, Row and Diagon parts a lot cleaner. The merely old sequential non-object-oriented version implies to call functions with a specific function as input and while coding it, I realized how it was clear that this logic was meant to be object-oriented rather than sequential in pure native javascript.





Hoping that these explanations made my logic and my preferences clear to you, I wish you well and am looking foreward to meeting you for more advances discussions.

Xavier Aristaghes