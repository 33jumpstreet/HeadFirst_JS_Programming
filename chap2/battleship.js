let location1 = 3;
let location2 = 4;
let location3 = 5;

let guess;
let hits = 0;
let guesses = 0;
var isSunk = false;

while (isSunk == false) {
  guess = prompt('준비, 조준, 발사 (0에서 6까지  중 추측한 숫자를 입력하세요):' );
  if (guess < 0 || guess > 6) {
    alert('입력값이 올바르지 않습니다. 올바른 방 번호 입력해봐')
  } else {
    guesses = guesses + 1 ;

    if(guess == location1 || guess == location2 || guess == location3) {
      alert('명중! 김명중!!')
      hits = hits + 1;
      if (hits == 3) {s
        isSunk = true;
        alert('전함 침물')
      }
    } else {
      alert('실패')
    }
  }
}

let state = `여러분은 전함을 격침시키기 위해 ${guess} 번 발사했씁니다. 따라서 명중률은 ${(3/guesses)} 입니다.` 
alert(state)
