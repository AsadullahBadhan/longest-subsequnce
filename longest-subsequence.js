// This is a former challenging Google interview question. The task is finding the 'longest Subsequence' of any given 'string' from a dictionary(array of strings).

// A string can be a subseqence of another string if all of its characters appear and are in the same order.
// For example, 'hello' is a subseqence of 'help love everyone' because 'h', 'e', 'l', 'l' and 'o' appear in the second string in the same order as 'hello'.
// 'abe' is not a subseqence of 'bale', because the 'a', 'b', and 'e' are not in the same order.
// 'bus' is a subseqence of 'abacus' because the 'b', 'u', and 's' all appear in the same order in 'abacus'.

// -------------- so let's do this --------------

// To solve this problem we have to break it down. firstly we will make some helper function. 

const dictionary = ['js', 'java', 'javas', 'javast', 'kangaroo'];
const word = 'javascript';

//finding the longest word from an array of string
function longestWord(subseqences) {
    let longestWord = '';
    for (const word of subseqences) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }
    return longestWord;
}

//this helper function will turn any string to an 'object' where letter would be property and indices of 
//characters are value. so we can map through any word and compare with the string
function mapString(word) {
    let map = {};
    for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        if (map[letter]) {
            map[letter].push(i);
        }
        else {
            map[letter] = [i];
        }
    }
    return map;
}

//this function takes a string(word) and an object. ckeck if each letter in string exists as a
//property in map we have just created
function isSubsequence(word, map) {
    let index = 0;
    for (const letter of word) {
        if (map[letter]) {
            index = findNextIndex(map[letter], index);
            if (index === false) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
}


//this helper function will compare the index position of the word and subsequences
function findNextIndex(array, minIndex) {
    for (const index of array) {
        if (index >= minIndex) {
            return index + 1;
        }
    }
    return false;
}

//So now we have all the helper function. Let's put all puzle pices together and make the final function of our problem
function longestSubsequence(word, dictionary) {
    let map = mapString(word);
    let subsequences = [];
    for (const words of dictionary) {
        if (isSubsequence(words, map)) {
            subsequences.push(words);
        }
    }

    return longestWord(subsequences);
}

let result = longestSubsequence(word, dictionary);
console.log(result);