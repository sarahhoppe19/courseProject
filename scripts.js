//javascript for course project

//making an array for the checkerboard
const checkerBoard = [
  null, 0, null, 1, null, 2, null, 3,
  4, null, 5, null, 6, null, 7, null,
  null, 8, null, 9, null, 10, null, 11,
  null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null,
  12, null, 13, null, 14, null, 15, null,
  null, 16, null, 17, null, 18, null, 19,
  20, null, 21, null, 22, null, 23, null
]

//looking for specific frogID and then returns the index of that piece on the board
let findFrog = function(frogID) {
  let search = parseInt(frogID);
  return checkerBoard.indexOf(search);
}

//global references from HTML 
let redFrogs = document.getElementsByClassName("red");
let blueFrogs = document.getElementsByClassName("blue");
const cells = document.getElementsByClassName("green");

//properties
let turn = true;
let redPoint = 12;
let bluePoint = 12;
let turnPieces;

//properties when a frog is selected
let selectedFrog = {
  frogID: -1, 
  boardFrogIndex: -1, 
  queened: false, 
  seventhSpace: false, 
  ninthSpace: false, 
  fourteenthSpace: false, 
  eighteenthSpace: false, 
  minusSeventhSpace: false, 
  minusNinthSpace: false, 
  minusFourteenthSpace: false, 
  minusEighteenthSpace: false  
}

//giving program instructions when a frog is clicked
function giveFrogListen() {
  if (turn) {
    for (i = 0; i < redFrogs.length; i++) {
      redFrogs[i].addEventListener("click", assignFrogs);
    }
  } else {
    for (i = 0; i < blueFrogs.length; i++) {
      blueFrogs[i].addEventListener("click", assignFrogs);
    }
  }
}

//assigning the correct frog color to the first player, which is redFrogs
function assignFrogs() {
  if (turn) {
    turnPieces = redFrogs;
  } else {
    turnPieces = blueFrogs;
  }
  
  removeCellonClick();
  removeHighlight();
}

//removes the move from previous selected frog just in case a frog is reselected
function removeCellonClick() {
  for (i = 0; i < cells.length; i++) {
    cells[i].removeAttribute("onclick");
  }
}

//removes the highlighted part of selected frog
function removeHighlight() {
  for (i = 0; i < turnPieces; i++) {
    turnPieces[i].style.border = "0px";
  }
  
  resetSFrogProperties();
  getSFrog();
}

//reseting the properties when a frog has been unselected
function resetSFrogProperties() {
  selectedFrog.frogID = -1;
  selectedFrog.boardFrogIndex = -1; 
  selectedFrog.queened = false; 
  selectedFrog.seventhSpace = false;
  selectedFrog.ninthSpace = false;
  selectedFrog.fourteenthSpace = false;
  selectedFrog.eighteenthSpace = false;
  selectedFrog.minusSeventhSpace = false;
  selectedFrog.minusNinthSpace = false;
  selectedFrog.minusFourteenthSpace = false;
  selectedFrog.minusEighteenthSpace = false;
}

//gets the ID and index from the lily pad it's on
function getSFrog() {
  selectedFrog.frogID = parseInt(event.target.id);
  selectedFrog.boardFrogIndex = findFrog(selectedFrog.frogID);
  
  isQueened();
}

//checking if the frog has been queened already
function isQueened() {
  if (document.getElementById(selectedFrog.frogID).classList.contains("queen")) {
    selectedFrog.isQueen = true;
  } else {
    selectedFrog.isQueen = false;
  }
  
  findEmptyLily();
}

//finds the open lilypads that the selected frog can move to
function findEmptyLily() {
  if (checkerBoard[selectedFrog.boardFrogIndex + 7] === null && cells[selectedFrog.boardFrogIndex + 7].classList.contains("empty") !== true) {
    selectedFrog.seventhSpace = true;
  }
  
  if (checkerBoard[selectedFrog.boardFrogIndex + 9] === null && cells[selectedFrog.boardFrogIndex + 9].classList.contains("empty") !== true) {
    selectedFrog.ninthSpace = true;
  }
  
  if (checkerBoard[selectedFrog.boardFrogIndex - 7] === null && cells[selectedFrog.boardFrogIndex - 7].classList.contains("empty") !== true) {
    selectedFrog.minusSeventhSpace = true;
  }
  
  if (checkerBoard[selectedFrog.boardFrogIndex - 9] === null && cells[selectedFrog.boardFrogIndex - 9].classList.contains("empty") !== true) {
    selectedFrog.minusNinthSpace = true;
  }
  
  checkJumpLily();
}

//looking to see if there are any jumps available for the player to make
function checkJumpLily() {
  if (turn) {
    if (checkerBoard[selectedFrog.boardFrogIndex + 14] === null && cells[selectedFrog.boardFrogIndex + 14].classList.contains("empty") !== true && checkerBoard[selectedFrog.boardFrogIndex + 7] >= 12) {
      selectedFrog.fourteenthSpace = true;
    }
    
    if (checkerBoard[selectedFrog.boardFrogIndex + 18] === null && cells[selectedFrog.boardFrogIndex + 18].classList.contains("empty") !== true && checkerBoard[selectedFrog.boardFrogIndex + 9] >= 12) {
      selectedFrog.eighteenthSpace = true;
    }
    
    if (checkerBoard[selectedFrog.boardFrogIndex - 14] === null && cells[selectedFrog.boardFrogIndex - 14].classList.contains("empty") !== true && checkerBoard[selectedFrog.boardFrogIndex - 7] >= 12) {
      selectedFrog.minusFourteenthSpace = true;
    }
    
    if (checkerBoard[selectedFrog.boardFrogIndex - 18] === null && cells[selectedFrog.boardFrogIndex - 18].classList.contains("empty") !== true && checkerBoard[selectedFrog.boardFrogIndex - 9] >= 12) {
      selectedFrog.minusEighteenthSpace = true;
    }
  } else {
    if (checkerBoard[selectedFrog.boardFrogIndex + 14] === null && cells[selectedFrog.boardFrogIndex + 14].classList.contains("empty") !== true && checkerBoard[selectedFrog.boardFrogIndex + 7] < 12 && checkerBoard[selectedFrog.boardFrogIndex + 7] !== null) {
      selectedFrog.fourteenthSpace = true;
    }
    
    if (checkerBoard[selectedFrog.boardFrogIndex + 18] === null && cells[selectedFrog.boardFrogIndex + 18].classList.contains("empty") !== true && checkerBoard[selectedFrog.boardFrogIndex + 9] < 12 && checkerBoard[selectedFrog.boardFrogIndex + 9] !== null) {
      selectedFrog.eighteenthSpace = true;
    }
    
    if (checkerBoard[selectedFrog.boardFrogIndex - 14] === null && cells[selectedFrog.boardFrogIndex - 14].classList.contains("empty") !== true && checkerBoard[selectedFrog.boardFrogIndex - 7] < 12 && checkerBoard[selectedFrog.boardFrogIndex - 7] !== null) {
      selectedFrog.minusFourteenthSpace = true;
    }
    
    if (checkerBoard[selectedFrog.boardFrogIndex - 18] === null && cells[selectedFrog.boardFrogIndex - 18].classList.contains("empty") !== true && checkerBoard[selectedFrog.boardFrogIndex - 9] < 12 && checkerBoard[selectedFrog.boardFrogIndex - 9] !== null) {
      selectedFrog.minusEighteenthSpace = true;
    }
  }
  
  checkFrogCon();
}

//changes the movement variable when the frog is queened
function checkFrogCon() {
  if (selectedFrog.isQueen) {
    borderFrog();
  } else {
    if (turn) {
      selectedFrog.minusSeventhSpace = false;
      selectedFrog.minusNinthSpace = false;
      selectedFrog.minusFourteenthSpace = false;
      selectedFrog.minusEighteenthSpace = false;
    } else {
      selectedFrog.seventhSpace = false;
      selectedFrog.ninthSpace = false;
      selectedFrog.fourteenthSpace = false;
      selectedFrog.eighteenthSpace = false;
    }
    
    borderFrog();
  }
}

//showing a border to the player to show the frog is indeed movable
function borderFrog() {
  if (selectedFrog.seventhSpace || selectedFrog.ninthSpace || selectedFrog.fourteenthSpace || selectedFrog.eighteenthSpace || selectedFrog.minusSeventhSpace || selectedFrog.minusNinthSpace || selectedFrog.minusFourteenthSpace || selectedFrog.minusEighteenthSpace) {
    document.getElementById(selectedFrog.frogID).style.border = "5px solid green";
    
    clickableCells();
  } else {
    return;
  }
}

//shows the cells that are available to click
function clickableCells() {
  if (selectedFrog.seventhSpace) {
    cells[selectedFrog.boardFrogIndex + 7].setAttribute("onclick", "moveFrog(7)");
  }
  
  if (selectedFrog.ninthSpace) {
    cells[selectedFrog.boardFrogIndex + 9].setAttribute("onclick", "moveFrog(9)");
  }
  
  if (selectedFrog.fourteenthSpace) {
    cells[selectedFrog.boardFrogIndex + 14].setAttribute("onclick", "moveFrog(14)");
  }
  
  if (selectedFrog.eighteenthSpace) {
    cells[selectedFrog.boardFrogIndex + 18].setAttribute("onclick", "moveFrog(18)");
  }
  
  if (selectedFrog.minusSeventhSpace) {
    cells[selectedFrog.boardFrogIndex - 7].setAttribute("onclick", "moveFrog(-7)");
  }
  
  if (selectedFrog.minusNinthSpace) {
    cells[selectedFrog.boardFrogIndex - 9].setAttribute("onclick", "moveFrog(-9)");
  }
  
  if (selectedFrog.minusFourteenthSpace) {
    cells[selectedFrog.boardFrogIndex - 14].setAttribute("onclick", "moveFrog(-14)");
  }
  
  if (selectedFrog.minusEighteenthSpace) {
    cells[selectedFrog.boardFrogIndex - 18].setAttribute("onclick", "moveFrog(-18)");
  }
}

//moving the frog that was previously selectedFrog
function moveFrog(num) {
  document.getElementById(selectedFrog.frogID).remove();
  cells[selectedFrog.boardFrogIndex].innerHTML = "";
  
  if (turn) {
    if (selectedFrog.isQueen) {
      //cells[selectedFrog.boardFrogIndex + num].innerHTML = 
    }
  }
}

/*I got up to this point with coding before I realized I should've made my HTML code based around a table instead of placing the png images I have made to allow the code to be more malleable 
with the JavaScript. With the HTML code I have now, I can still add the movement, but because my classes and ID's are labelled the way they are, I've only made this issue more difficult.*/



















