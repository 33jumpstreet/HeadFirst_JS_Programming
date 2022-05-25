const scores = [60, 50, 60, 58, 54, 54, 58, 50, 52, 54, 48, 69, 34, 55, 51, 52, 44, 51, 69, 64, 66, 55, 52, 61, 46, 31, 57, 52, 44, 18, 41, 53, 55, 61, 51, 44 ] 
const costs = [.25, .27, .25, .25, .25, .25, .33, .31, .25, .29, .27, .22, .31, .25, .25, .33, .21, .25, .25, .25, .28, .25, .24, .22, .20, .25, .30, .25, .24, .25, .25, .25, .27, .25, .26, .29]

let output; // 결과 초기화
let highScore = 0; // 최고점수 초기화

// while(i < scores.length) {
//   output = `비눗방울 용액 #${i} 점수:${scores[i]}`
//   console.log(output)
//   i = i + 1
// }

for (let i =0; i < scores.length; i++) {
  output = `비눗방울 용액 #${i} 점수:${scores[i]}`
  console.log(output) 
  if (scores[i] > highScore) {
    highScore = scores[i]
  }
}

let bestSolutions = []; // 최고 점수를 올린 용액들의 번호

for (let i = 0; i < scores.length; i++) {
  if (scores[i] == highScore) {
    bestSolutions.push(i)
  }
}

console.log(`비누방울 실험횟수 : ${scores.length}`)
console.log(`최고 비눗방울 점수 : ${highScore}`)
console.log(`최고 점수 용액  번호 : ${bestSolutions}`)

let cost = 100;
let index;

for(let i=0; i <scores.length; i++) {
  if(scores[i] == highScore) {
    if(cost > cost[i]) {
      index = i;
      cost = costs[i];
    }
  }
}
