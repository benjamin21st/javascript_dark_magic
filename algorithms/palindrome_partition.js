/**
 * https://leetcode.com/problems/palindrome-partitioning/description/
 *
 * Given a string s, partition s such that every substring of the partition is a palindrome.
 *
 * Return all possible palindrome partitioning of s.
 *
 * For example, given s = "aab",
 * Return
 *
 * [
 *   ["aa","b"],
 *   ["a","a","b"]
 * ]
 *
 * given s = "abcba"
 *     [
 *       ['a', 'b', 'c', 'b', 'a'],
 *       ['a', 'bcb', 'a'],
 *       ['abcba']
 *     ]
 */
function palindromePartition(s) {
  let res = [];
  palindromeRecPartition(s, 0, [], res);
  return res;
}

function palindromeRecPartition(s, start, curr, res) {
  // base case
  if (start >= s.length) {
    res.push(curr.slice(0));
    return;
  }

  for (let i = start; i < s.length; ++i) {
    let substr = s.substring(start, i + 1);

    if (helperIsPalindrome(substr)) {
      palindromeRecPartition(s, i + 1, curr.concat([substr]), res);
    }
  }
}

function helperIsPalindrome(s) {
  let i = 0, j = s.length - 1;
  while (i < j) {
    if (s[i] !== s[j]) {
      return false;
    }
    ++i, --j;
  }
  return true;
}

console.log('Run: testPalindromePartition(s)')

function testPalindromePartition(s) {
  if (!s) {
    s = 'aacba';
  }
  console.log(palindromePartition(s));
}
