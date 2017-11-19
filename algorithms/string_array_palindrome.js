// TODO: the original more complicated but expected to be
//       more time/resource saving helper was failing
console.log(stringPalindrome(["abcd", "dcba", "lls", "s", "sssll"]));

// https://leetcode.com/problems/palindrome-pairs/discuss/

// O(n**2 * k)
function stringPalindrome(A) {
    let res = [];
    
    for (let i = 0; i < A.length; ++i) {
        for (let j = 0; j < A.length; ++j) {
            if (i === j) {
                continue;
            }
            if (helper2(A[i], A[j])) {
                res.push([i, j]);
            }
        }
    }
    
    return res;
}

// newStr.length == k, O(k)
function helper2(word1, word2) {
    let newStr = word1 + word2;
    return newStr === newStr.split('').reverse().join('');
}

function helper(word1, word2) {
    // we expect the final word is word1 + word2
    // lls  + s => false
    // sll  + s => true
    let left = 0,
        right = word2.length - 1;
    
    while (left <= word1.length - 1 && right >= 0) {
        if (word1[left] !== word2[right]) {
            return false;
        }
        ++left;
        --right;
    }
    
    
    // word1.length > word2.length: 
    if (left < word1.length - 1) {
        // we have remaining characters from word1
        return isPalindrome(word1, left, word1.length - 1);
    } else if (right > 0) {
        return isPalindrome(word2, 0, word2.length - 1);
    } else { // both words run out of characters, or there is only one remaining character
        return true;
    }
}

function isPalindrome(word, left, right) {
    while (left <= right) {
        if (word[left] != word[right]) {
            return false;
        }
    }
    return true;
}
