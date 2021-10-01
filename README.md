# Minesweeper
Minesweeper is a classic puzzle game that has become an iconic feature of the Windows OS. Minesweeper dates back to the 1960s, and was a staple time-waster native to Windows OS from 1990 until 2006. The game is a wonderful little logic puzzle that really emphasizes using case-analysis to make optimal moves. 
Fun fact, basic Minesweeper is known to be NP-complete, putting in a class of very difficult computational problems. Basically, if you think you have an algorithm that can solve _any_ Minesweeper board, then there are a lot of people who will be very excited! 


## Getting Started
The game is very simple. There are 8 mines lurking beneath the grid. Uncovering even one of them means instant defeat. The cells give clues however; each uncovered cell displays the number of adjacent (vertically, horizontally, _and_ diagonally) cells which contain a mine. Tread carefully, and you may be able to determine the location of every mine, and ensure you avoid stepping on them in the future! 

**Click [here](https://amillar1.github.io/AMillar_SEI_Project1_Minesweeper/) to play!**

[Screenshot1](https://i.imgur.com/M8uSFFM.png)
[Screenshot2](https://i.imgur.com/O7uYpO4.png)

## Next Steps
There are a number of features that could be added to improve the gameplay experience: 
* Many versions of Minewseeper 'protect' the first move, ensuring that it will have no adjacent mines. This can be accomplished by not distributing mines until _after_ the first click, and excluding all mines that are neighbors of the first cell clicked. 
* There are also restrictions that can be put on the mine distribution function that make it so that the game is _decidable_ i.e. that it is possible to deduce the arrangement of mines from the number-clues. As it stands, my version of Minesweeper distributes mines at random, and so there are 'ambiguous configurations' where the number-clues are consistent with more than one configuration of mines. 
* Other quality-of-life features include: highlighting adjacent cells when mousing over a cell; 'autoclicking' on all non-flagged adjacent cells when the number of flags adjacent to a cell equals that cell's number. 

## Technologies Used
* HTML/CSS
* native Javascript