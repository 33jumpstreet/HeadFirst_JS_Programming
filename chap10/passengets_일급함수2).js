const passengers = [
  {name: "김함수", paid:true, ticket: "일반석" },
  {name: "닥터 이블", paid:true, ticket: "일등석" },
  {name: "박루프", paid:false, ticket: "일등석" },
  {name: "최호출", paid:true, ticket: "일반석" }
];


// 승무원 음료수 주문 코드
function createDrinkOrder(passenger) {
  let orderFunction;

  if (passenger.ticket === "일등석") {
    orderFunction = function() {
      alert("칵테일이나 와인을 드시겠습니까?");
    };
  } else {
    orderFunction = function() {
      alert("물이나 콜라 드릴까요?")
    }
  } return orderFunction;
}

// 승무원이 해야 하는 일
function serveCustomer(passenger) {
  let getDrinkOrderFunction = createDrinkOrder(passenger);
  // 식사 주문하기
  getDrinkOrderFunction();
  // 영화 상영하기
  getDrinkOrderFunction();
  getDrinkOrderFunction();
  // 쓰리게 비우기
  getDrinkOrderFunction();
}

// 승객 목록에 있는 각 승객에 대해 serveCustomer()를 호출하는 함수 
function servePassengers(passengers) {
  for (let i=0; i < passengers.length; i++) {
    serveCustomer(passengers[i]);
  }
}

servePassengers(passengers);

