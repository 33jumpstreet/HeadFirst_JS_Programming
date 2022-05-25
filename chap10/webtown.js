const products = [ 
  { name: "자몽", calories: 170, color: "빨간색", sold: 8200 },
  { name: "오렌지", calories: 160, color: "주황색", sold: 12101 },
  { name: "콜라", calories: 210, color: "갈색", sold: 25412 },
  { name: "다이어트 콜라", calories: 0, color: "갈색", sold: 43922 },
  { name: "레몬", calories: 200, color: "무색", sold: 14983 },
  { name: "라즈베리", calories: 180, color: "분홍색", sold: 9427 },
  { name: "루트 비어", calories: 200, color: "갈색", sold: 9909 },
  { name: "생수", calories: 0, color: "무색", sold: 62123 }
];

// sold
function compareSold(colaA, colaB) {
  if (colaA.sold > colaB.sold) {
    return 1;
  } else if (colaA.sold === colaB.sold) {
    return 0;
  } else {
    return -1;
  }
}

// name
function compareName(colaA, colaB) {
  if (colaA.name > colaB.name) {
    return 1;
  } else if (colaA.name === colaB.name) {
    return 0;
  } else {
    return -1;
  }
}

// calories
function compareCalories(colaA, colaB) {
  if (colaA.calories > colaB.calories) {
    return 1;
  } else if (colaA.calories === colaB.calories) {
    return 0;
  } else {
    return -1;
  }
}

// color
function compareColor(colaA, colaB) {
  if (colaA.color > colaB.color) {
    return 1;
  } else if (colaA.color === colaB.color) {
    return 0;
  } else {
    return -1;
  }
}

function printProducts (products) {
  for (let i=0; i < products.length; i++) {
    console.log(
      `제품명: ${products[i].name}, 
      칼로리: ${products[i].calories}, 
      색상: ${products[i].color},
      판매량ㅣ ${products[i].sold}`);
  }
}

products.sort(compareSold);
printProducts(products);

products.sort(compareName);
printProducts(products);

products.sort(compareCalories);
printProducts(products);

products.sort(compareColor);
printProducts(products);