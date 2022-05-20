const view = {
  displaymessage : function(msg) { // 사용자한테 메시지 전달할 메소드
    const messageArea = document.querySelector("#messageArea");
    messageArea.innerHTML = msg; 
  },
  displayHit : function(location) { // 명중했을 때 메소드
    const cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss : function(location) { // 실패했을 때 메소드
    const cell = document.getElementById(location);
    cell.setAttribute("class", "miss");    
  }
}

const model = {
  boardSize : 7, // 게임판의 격자의 크기
  numShips : 3, // 전함의 수
  shipLength : 3, // 각 전함의 위치의 수
  shipsSunk : 0, // 격침 된 전함의 수
  ships : [
    {locations : ["0", "0", "0"], hits: ["", "", ""]}, // 각 전함의 위치과 명중 여부
    {locations : ["0", "0", "0"], hits: ["", "", ""]},
    {locations : ["0", "0", "0"], hits: ["", "", ""]}
  ],
          
  fire : function(guess) {
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      let index = ship.locations.indexOf(guess);
      
      if (ship.hits[index] === "hit") {
        view.displaymessage("그 위치는 이미 적중된 곳입니다.");
        return true;
      } else if (index >= 0) {
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
    view.displayMiss(guess);
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
  
  	generateShipLocations: function() {
		let locations;
		for (let i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
  },

  generateShip : function() {
    const direction = Math.floor(Math.random() * 2); // 방향, 두자리 수가 필요해서 *2, 0과 1이 반환
    let row, col; 

    if (direction === 1) { // 가로 
      row = Math.floor(Math.random() * this.boardSize); // 가로로 된 전함은 어떤 행도 가능
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1)); // 
    } else { // 세로
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
      col = Math.floor(Math.random() * this.boardSize);
    }
    
    let newShipLocations = []; // 위치
    for (let i = 0; i <this.shipLength; i++) {
      if (direction === 1) { // 가로 
        newShipLocations.push(row + "" + (col + i));
      } else { // 세로
        newShipLocations.push((row + i) + "" + col);
      }
    }
    return newShipLocations;
  },

  collision : function(locations) {
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      for (let j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true; // 같은 위치에 있는 전함 발견시 true
        }
      }
    }
    return false; // indexOf가 -1이 나왔다는 의미로 충돌이 없다는 의미
  }
};

const controller = {
  guesses : 0, // 추측한 홧수를 0으로 초기화, 객체 정의

  processGuess : function (guess) {
    const location = parseGuess(guess);
    if (location) {
      this.guesses++;
      let hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displaymessage("여러분은" + this.guesses + " 번 추측해 전함을 모두 격침시켰습니다.");
      }
    }
  }
}

function parseGuess(guess) {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G"];
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

function handleFireButton() {
  const guessInput = document.querySelector("#guessInput");
  const guess = guessInput.value.toUpperCase();

  controller.processGuess(guess);

  guessInput.value = ""; // 한번 입력한 후에 기존 입력 값을 지우고 새로 추측한 값을 입력하는 번거로움 피하기
}

function handlekeyPress(e) {
  const fireButton = document.querySelector("#fireButton");
  
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

window.onload = init;

function init() {
  const fireButton = document.querySelector("#fireButton");
  fireButton.onclick = handleFireButton;

  // return 키 처리기
  const guessInput = document.querySelector("#guessInput");
  guessInput.onkeydown = handlekeyPress;

  // 점함들을 게임판에 놓기
  model.generateShipLocations();
}


