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



//when page loads
window.onload = function() {
  frogList = document.getElementsByClassName("check");  //collection of all frogs
  bFrogList = document.getElementsByClassName("blue"); //collection of blue frogs
  rFrogList = document.getElementsByClassName("red");  //collection of red frogs
  
  frogCount = frogList.length;    //how many frogs total
  bFrogCount = bFrogList.length; //how many blue frogs on board
  rFrogCount = rFrogList.length; //how many red frogs on board
  
  assignPieces();
  
  for (i = 0; i < frogCount; i++) {
    frogList[i].onclick = function() {
      frogClicked(this);
    }
  }
}