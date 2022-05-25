const passengers = [
  {name: "김함수", paid:true},
  {name: "닥터 이블", paid:true},
  {name: "박루프", paid:false},
  {name: "최호출", paid:true}
];

const onNoFlyList = "닥터 이블";

// 출국 금지자
function checkNoFly(passengers) {
  for (let i=0; i < passengers.length; i++) {
    if (onNoFlyList === passengers[i].name) {
      console.log(passengers[i].name);
    }
  }
  return true;
}

// 요금완불승객
function checkPaid(passengers) {
  for (let i=0; i < passengers.length; i++) {
    if (!passengers[i].paid) {
      console.log(passengers[i].name);
    }
  }
  return true;
}

// 승객명단 출력
function printPassengers(passengers) {
  for (let i=0; i < passengers.length; i++) {
    console.log(passengers[i].name);
  }
  return true;
}

checkNoFly(passengers);
checkPaid(passengers);
printPassengers(passengers);

