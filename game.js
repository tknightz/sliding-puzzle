const container = document.getElementById("pieces");
const sampleImg = document.getElementById("sample-img");
const moves = document.getElementById("moves");
const resetBtn = document.getElementById("reset-btn");
const level = document.getElementById("level");
const bannerWin = document.getElementById("banner-win");
const hijackUploadBtn = document.getElementById("hijack-upload-btn");
const hiddenUploadBtn = document.getElementById("upload-btn");
let userImage = "./assets/monalisa.jpg";

class Game {
  constructor(imgSrc, gridSize=3) {
    this.imgSrc = imgSrc;
    this.gridSize = gridSize;
    this.numOfPieces = gridSize * gridSize;
  }

  preset(){
    this.riddle = [];
    this.riddleSolved = "";
    this.pieceUrls = [];
    this.moves = 0;
    this.gridSize = parseInt(level.value);
    bannerWin.style.display = "none";
    bannerWin.style.backgroundImage = `url(${this.imgSrc})`;
    sampleImg.src = this.imgSrc;
    container.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
    container.innerHTML = "";
    moves.innerText = "0";
  }

  createRiddle(){
    for (let i=0; i<this.numOfPieces; i++) this.riddle.push(i);
    this.riddleSolved = this.riddle.toString();
    // shuffle array
    this.riddle.sort((a, b) => 0.5 - Math.random());
  }

  start(){
    this.preset();
    this.createRiddle()
    this.loadPieces();
  }

  loadPieces(){
    const image = new Image();
    image.src = this.imgSrc;
    image.onload = () => {
      const minDimension = Math.min(image.naturalWidth, image.naturalHeight);
      const pieceSize = Math.floor(minDimension / this.gridSize);

      for (let i = 0; i < this.gridSize; i++) {
        for (let j = 0; j < this.gridSize; j++) {
          const cv = document.createElement("canvas");
          cv.height = pieceSize;
          cv.width = pieceSize;

          const ctx = cv.getContext("2d");
          ctx.drawImage(image, j * pieceSize, i * pieceSize, pieceSize, pieceSize, 0, 0, cv.width, cv.height);
          this.pieceUrls.push(cv.toDataURL());
        }
      }

      this.riddle.forEach((num, idx) => {
        let ele;
        if (num === this.gridSize * this.gridSize - 1) {
          ele = document.createElement("div");
        } else {
          ele = document.createElement("img");
          ele.classList.add("piece");
          ele.src = this.pieceUrls[num];
        }
        ele.addEventListener("click", this.handleImageClick.bind(this));
        ele.setAttribute("data-idx", idx);
        ele.setAttribute("data-x", 0);
        ele.setAttribute("data-y", 0);
        container.append(ele);
      })
    }
  }

  isInBoard(idx) {
    return idx < this.riddle.length && idx >= 0;
  }

  swap(idx1, idx2) {
    [this.riddle[idx1], this.riddle[idx2]] = [this.riddle[idx2], this.riddle[idx1]]
  }

  handleImageClick(e){
    const ele = e.target;
    const hiddenPiece = this.numOfPieces - 1;
    const idx = parseInt(ele.getAttribute("data-idx"));
    const dataX = parseInt(ele.getAttribute("data-x"));
    const dataY = parseInt(ele.getAttribute("data-y"));
    let newX = dataX, newY = dataY, newIdx = idx;

    const canMoveLeft = idx => !(idx % this.gridSize === 0);
    const canMoveUp = idx => idx >= this.gridSize;
    const canMoveDown = idx => idx < this.gridSize * (this.gridSize - 1);
    const canMoveRight = idx => !((idx+1) % this.gridSize === 0);

    if (canMoveLeft(idx) && this.riddle[idx - 1] === hiddenPiece) {
      newX -= 100;
      newIdx = idx - 1;
      this.swap(idx, idx - 1);
    }
    if (canMoveRight(idx) && this.riddle[idx + 1] === hiddenPiece) {
      newX += 100;
      newIdx = idx + 1;
      this.swap(idx, idx + 1);
    }
    if (canMoveUp(idx) && this.riddle[idx - this.gridSize] === hiddenPiece) {
      newY -= 100;
      newIdx = idx - this.gridSize;
      this.swap(idx, idx - this.gridSize);
    }
    if (canMoveDown(idx) && this.riddle[idx + this.gridSize] === hiddenPiece) {
      newY += 100;
      newIdx = idx + this.gridSize;
      this.swap(idx, idx + this.gridSize);
    }

    if (newIdx !== idx || newX !== dataX || newY !== dataY) {
      ele.setAttribute("data-idx", newIdx);
      ele.setAttribute("data-x", newX);
      ele.setAttribute("data-y", newY);
      ele.style.translate = `${newX}% ${newY}%`
      this.moves += 1;
      moves.innerText = this.moves;
    }

    if (this.riddle.toString() === this.riddleSolved) {
      // game over
      bannerWin.style.display = "flex";
    }
  }
}

function newGame(){
  game = new Game(userImage, parseInt(level.value));
  game.start();
}

// load the game when user open the web
document.addEventListener("DOMContentLoaded", newGame);

// event listener
hijackUploadBtn.addEventListener("click", () => {
  hiddenUploadBtn.click();
})

hiddenUploadBtn.addEventListener("change", () => {
  const imgSrc = hiddenUploadBtn.files[0];
  if (imgSrc) {
    const imgUrl = URL.createObjectURL(imgSrc);
    userImage = imgUrl;
    game = new Game(imgUrl, parseInt(level.value));
    game.start();
  }
})

level.addEventListener("change", (e) => {
  game = new Game(userImage, parseInt(e.target.value));
  game.start();
})

resetBtn.addEventListener("click", newGame);
