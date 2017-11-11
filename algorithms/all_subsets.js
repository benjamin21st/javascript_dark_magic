/**
 * time: O(n * 2**n)
 * explanation:
 *  - for each element in the set, there is 2 states (present
 *    in the final set, or not), hence 2**n
 *  - we generate these 2**n possible outcomes for all n
 *    elements, hence n
 */
function generateSubsets(A) {
  let res = [[]];
  // Make the algorithm future proof by skipping duplicates
  A.sort();

  for (let i = 0; i < A.length; ++i) {
    if (i !== 0 && A[i] === A[i - 1]) {
      continue;
    }
    let sidx = 0, eidx = res.length - 1;
    for (let j = sidx; j <= eidx; ++j) {
      res.push(res[j].concat([A[i]]));
    }
  }
  return res;
}

function generateSubsetsRec(A) {
  let res = [[]];
  generateSubsetsHelper(A, 0, res);
  return res;
}

function generateSubsetsHelper(A, start, res) {
  if (start >= A.length) return;
  // ignore duplicates
  if (start !== 0 && A[start] === A[start - 1]) {
    generateSubsetsHelper(A, start + 1, res);
  } else {
    let sidx = 0, eidx = res.length - 1;

    // Using this approach as opposed to reassign res
    // value to preserve "res"'s reference
    for (let i = sidx; i <= eidx; ++i) {
      res.push(res[i].concat([A[start]]));
    }
    generateSubsetsHelper(A, start + 1, res);
  }
}

console.log('Run: testGenerateSubsets(A)');
function testGenerateSubsets(A) {
  if (!A) {
    A = [0, 1, 2];
  }

  console.log('iterative:', generateSubsets(A));
  console.log('recursive:', generateSubsetsRec(A));
}
