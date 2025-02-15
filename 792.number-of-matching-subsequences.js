// 792. Number of Matching Subsequences
// Given a string s and an array of strings words, return the number of words[i] that is a subsequence of s.
// A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
  // For example, "ace" is a subsequence of "abcde".


// Solution: Keep Pointers for each Word

// Use a node for each word which tracks:
  // wordIdx: the index of the word in words
  // index: the index for the word (which character we are up to)
// chars: An array of length 26. A node in chars[i] indicates that the character at the current index is i.

// For each character in s, we match the characters of nodes.
  // then, we increase the index of each node.
  // if the index reaches the end of the word, increase ans by 1.
  // otherwise, add the node into the container for the character we are now pointing at.

// n = s.length, m = words.length, k = max length of a word
// Time Complexity: O(n + m * k) 163ms
// Space Complexity: O(m) (one pointer for each word) 52.2MB
var numMatchingSubseq = function(s, words) {
  let chars = Array(26);
  for (let i = 0; i < 26; i++) chars[i] = [];
  for (let i = 0; i < words.length; i++) {
    let node = new Node(i, 0);
    chars[words[i].charCodeAt(0) - 97].push(node);
  }
  
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    let matches = chars[s.charCodeAt(i) - 97];
    chars[s.charCodeAt(i) - 97] = []; // reset early since we may have to push nodes back to here
    for (let node of matches) {
      node.index++;
      if (node.index === words[node.wordIdx].length) { // matched the entire word
        ans++;
        continue;
      }
      // add the node back to container for the new character
      let nextChar = words[node.wordIdx].charCodeAt(node.index) - 97;
      chars[nextChar].push(node);
    }
  }
  return ans;
};

class Node {
  constructor(wordIdx, index) {
    this.wordIdx = wordIdx; // index in words
    this.index = index; // index in the word
  }
}

// Two test cases to run function on
console.log(numMatchingSubseq("abcde", ["a","bb","acd","ace"])) // 3
console.log(numMatchingSubseq("dsahjpjauf", ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"])) // 2