class Item {
  constructor(weight, value) {
    this.weight = weight;
    this.value = value;
  }
}


class KnapsackRec {
  robAHouse(items, capacity) {
    items.sort((a, b) => a.weight - b.weight);

    // indicates the highest value we can store at
    // each capacity level
    let menu = (new Array(capacity + 1)).fill(-1);

    // start backwards and filter out the ones larger than capacity
    let startPos = items.length - 1;
    while (items[startPos].weight > capacity) --startPos;

    // recursively call helper function to fill up menu, then
    // return the value at the highest capacity
    this.robAHouseHelper(items, capacity, startPos, menu);
    return menu[menu.length - 1];
  }

  robAHouseHelper(items, capacityLeft, startPos, menu) {
    if (startPos < 0) return 0;
    // pick this current item or not pick it
    if (menu[capacityLeft] === -1) {
      let pickThis = items[startPos].weight > capacityLeft ?
        menu[capacityLeft]                                 :
        // never, never, never forget to include this item's value!!!!
        items[startPos].value + this.robAHouseHelper(items,
          capacityLeft - items[startPos].weight, startPos - 1, menu);
      let notPickThis = this.robAHouseHelper(items, capacityLeft, startPos - 1, menu);
      menu[capacityLeft] = Math.max(pickThis, notPickThis);
    }
    return menu[capacityLeft];
  }
}

class KnapsackDP {
  robAHouse(items, capacity) {
    items.sort((a, b) => a.weight - b.weight);
    let dp = new Array(items.length);
    for (let i = 0; i < dp.length; ++i) {
      dp[i] = (new Array(capacity + 1)).fill(0);
    }

    for (let i = 0; i < dp.length; ++i) {
      for (let j = 0; j < dp[0].length; ++j) {
        // we can carry some previous computed results
        // start with the value above, the idea is that
        // if we don't include current item, we don't
        // change capacity (j)
        if (i !== 0) dp[i][j] = dp[i - 1][j];
        // then we check the value to the left, which is
        // the most we can carry at a previous capacity
        if (j !== 0) dp[i][j] = Math.max(dp[i][j], dp[i][j-1]);
        // because i points to item, and j points to capacity
        // now we check if items[i] can be taken
        if (items[i].weight > j) {
          // not sure we can take this
        } else {
          // if we take this, is it better than we not taking it?
          dp[i][j] = Math.max(dp[i][j], items[i].value + dp[i][j - items[i].weight]);
        }
      }
    }
    return dp[dp.length - 1][dp[0].length - 1];
  }
}

console.log('Run: testRobAHouse() to run the tests')
function testRobAHouse() {
  let weights = [5, 3, 4, 2];
  let values = [60, 50, 70, 30];
  let items = [];
  for (let i = 0; i < values.length; ++i) {
    items.push(new Item(weights[i], values[i]));
  }
  let sol1 = new KnapsackRec();
  let sol2 = new KnapsackDP();
  console.log(items);
  console.log('                          ', 'Recursive', 'DP Iterative')
  console.log('Robbing with capacity of 5', sol1.robAHouse([...items], 5), sol2.robAHouse([...items], 5));
  console.log('Robbing with capacity of 4', sol1.robAHouse([...items], 4), sol2.robAHouse([...items], 4));
}
