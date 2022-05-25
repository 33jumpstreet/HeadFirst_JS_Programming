const passengers = [
  {name: "김함수", paid:true},
  {name: "닥터 이블", paid:true},
  {name: "박루프", paid:false},
  {name: "최호출", paid:true}
];

// 승객 전체를 반복하는 방법을 알고 있는 함수
function processPassengers(passengers, testFunction) {
  for (let i=0; i < passengers.length; i++) {
    if (testFunction(passengers[i])) {
      return false;
    }
  }
  return true;
}

// 출금 금지자 
function checkNoFlyList(passenger) {
  return (passenger.name === "닥터 이블");
} 

// 요금지불여부
function checkPaid(passengers) {
  return (!passengers.paid); 
  
}

// 승객명단 출력
function printPassengers(passengers) {
  let message = passengers.name;
  if (passengers.paid === true) {
    message = message + " 는 요금을 지불했습니다.";
  } else {
    message = message + " 는 요금을 지불하지 않았습니다.";
  }
  console.log(message);
  return false;  
}

// 함수를 함수에 전달하기 
let allCanFly = processPassengers(passengers, checkNoFlyList);
if(!allCanFly) {
  console.log("비행기가 이륙할 수 없습니다. 승객 중 출국 금지자가 있습니다.");
}

let allPaid = processPassengers(passengers, checkPaid);
if(!allPaid) {
  console.log("비행기가 이륙할 수 없습니다. 요금을 지불하지 않은 승객이 있습니다.");
}

processPassengers(passengers, printPassengers);


