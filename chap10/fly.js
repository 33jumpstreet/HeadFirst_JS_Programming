const migrating = true; // 2)

const fly = function(num) { // 3)
  for (let i=0; i < num; i++) {
    console.log("훨훨");
  }
};

function quack(num) { // 1)
  for (let i=0; i<num; i++) {
    console.log("꽥");
  }
}

if(migrating) { // 4)
  quack(4);
  fly(4);
}