let model = {
  boardSize : 7,
  numShips : 3,
  shipLength : 3, 
  shipsSunk : 0,
  ships : [{loactions : ["0", "0", "0"], hits: ["", "", ""]},
          {loactions : ["0", "0", "0"], hits: ["", "", ""]},
          {loactions : ["0", "0", "0"], hits: ["", "", ""]}],
  fire : function(guess) {
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      let index = ship.loactions.indexOf(guess);
      if (index >= 0) {
        // 명중했습니다. , -1 반환은 일치하는 값이 없기때문
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displaymessage("명중!");
        if (this.isSunk(ship)) {
          view.displaymessage("전함이 격침 되었습니다.");
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayHit(guess);
    view.displaymessage("실패했습니다.");
    return false;
  },
  isSunk : function(ship) {
    for (let i = 0; i < this.shipLength; i++) {
      if(ship.hits[i] !== "hit") {
        return false
      }
    }
    return true;
  },
  generateShipLocations : function() {
    let locations;
    for (let i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
  },
  generateShip : function() {
    let direction = Math.floor(Math.random()*2);
    let row, col;

    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength+1));
    } else {
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength+1));
      col = Math.floor(Math.random() * this.boardSize);
    }
    
    let newShipLocations = [];
    for (let i=0; i <this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push((row + i) + "" + col);
      }
    }
    return newShipLocations;
  },
  collision : function(locations) {
    for (let i=0; i < this.numShips; i++) {
      let ship = model.ships[i];
      for (let j = 0; j < locations.length; j++) {
        if (ship.loactions.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }
};

let view = {
  displaymessage : function(msg) {
    let messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg; 
  },
  displayHit : function(location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss : function(location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "miss");    
  }
}

let controller = {
  guesses : 0,
  processGuess : function parseGuess(guess) {
    let location = parseGuess(guess);
    if (location) {
      this.guesses++;
      let hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displaymessage("여러분은" + this.guesses + "번 추측해 전함을 모두 격침시켰습니다.");
      }
    }
    let alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !==2) {
      alert('입력이 올바르지 않습니다. 게임판의 문자와 숫자를 이용해 입력하세요')
    } else {
      let firstChar = guess.charAt(0);
      let row = alphabet.indexOf(firstChar);
      let column = guess.charAt(1);
      
      if (isNaN(row) || isNaN(column)) {
        alert('위치값이 올바르지 않습니다.');
      } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
        alert('앗, 보드 바깥으로 벗어났어요');
      } else {
        return row + column;
      }
      return null;
    }
  }
}

function handlekeyPress(e) {
  let fireButton = document.getElementById("fireButton");
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

function init() {
  let fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  let guessInput = document.getElementById("guessInput");
  guessInput.onkeydown = handlekeyPress;

  model.generateShipLocations();
}

function handleFireButton() {
  let guessInput = document.getElementById("guessInput");
  let guess = guessInput.value;
  controller.processGuess(guess);

  guessInput.value = "";
}

window.onload = init;