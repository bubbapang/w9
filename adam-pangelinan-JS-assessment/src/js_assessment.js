function spaceship(left, right) {
    if (left < right) {return -1}
    else if (left === right) {return 0}
    else {return 1}
}


// Write a function, `shuffledSentenceDetector(sentence1, sentence2)`, that
// returns true if the words in `sentence1` can be rearranged to form
// `sentence2`.

function shuffledSentenceDetector(sentence1, sentence2) {
    if (sentence1.length !== sentence2.length) {return false}
    hash = {}
    for (let word1 of sentence1) {
        if (!hash[word1]) { //if it doesnt exist in hash
            hash[word1] = 1 //init it
        } else { //if its already there
            hash[word1]++ //increment it
        }
    }

    for (let word2 of sentence2) {
        if (!hash[word2]) { //if word2 isnt there
            hash[word2] = -1
        } else { //if its already there
            hash[word2]--
        }
    }

    let status = true
    for (let key of Object.keys(hash)) {
        console.log(key, hash[key])
        if (hash[key] !== 0) {
            status = false
        }
    }
    return status
}

let sentence1 = "the cat ate the rat";
let sentence2 = "the rat ate the cat";

console.log(shuffledSentenceDetector(sentence1, sentence2))

// Write an `Array.prototype.myEach(callback)` method that invokes a callback
// for every element in an array and returns undefined. 
//
// **Do NOT use the built-in `Array.prototype.forEach` method in your 
// implementation.**

Array.prototype.myEach = function(callback) {
    for (let ele of this) {
        callback(ele)
    }
}


// Write an `Array.prototype.myFilter(callback)` that takes a callback and
// returns a new array which includes every element for which the callback 
// returned true. Use the `Array.prototype.myEach` method you defined above. 
//
// **Do NOT use the built-in `Array.prototype.filter` or 
// `Array.prototype.forEach` methods in your implementation.**

Array.prototype.myFilter = function(callback) {
    let arr = []
    this.myEach(function(ele) {
        if (callback(ele)) {
            arr.push(ele)
        }
    })
    return arr
}

// Write a function `pairMatch(array, callback)`. It should return all pairs
// of indices ([i, j]) for which `callback(array[i], array[j])` returns true.
//
// NB: Keep in mind that the order of the arguments to the callback may matter.
// e.g., callback = function(a, b) { return a < b }

function pairMatch(array, callback) {

    callback = callback || spaceship

    let pairs = []
    for (let i = 0; i < array.length; i++) { //iterating over whole array
        for (let j = 0; j < array.length; j++) { //iterating from second ele
            if (callback(array[i], array[j])) { //if callback rings true
                if (!pairs.includes([i, j])){ //if pairs doesnt have this pair already
                    if (i !== j) {
                        pairs.push([i, j]) //push the pair in
                    }
                }
            }
        }
    }
    return pairs
}

// Write an `Array.prototype.mergeSort` method that merge sorts an array. It 
// should take an optional callback that compares two elements, returning -1 if 
// the first element should appear before the second, 0 if they are equal, and 1 
// if the first element should appear after the second. Define and use a helper 
// method, `merge(left, right, comparator)`, to merge the halves. Make sure that 
// `merge` is defined on the window. 
//
// **Do NOT call the built-in `Array.prototype.sort` or `Array.prototype.sort_by`
// methods in your implementation.**
//
// Here's a summary of the merge sort algorithm:
//
// Split the array into left and right halves, then merge sort them recursively
// until a base case is reached. Use a helper method, merge, to combine the
// halves in sorted order, and return the merged array.

Array.prototype.mergeSort = function(comparator) {

    let dup = this.slice()
    comparator = comparator || spaceship

    if (dup.length < 2) {
        return dup
    } else {
        let middleIndex = Math.floor(dup.length / 2)
        let left = dup.slice(0, middleIndex).mergeSort(comparator) //an array
        let right = dup.slice(middleIndex).mergeSort(comparator) //an array
        console.log(left, right)
        return merge(left, right, comparator)
    }

}

function merge(left, right, comparator) { //left and right are arrays
    let merged = []
    console.log(left, right)
    while (left.length && right.length) { //while there are eles in both
        if (comparator(left[0], right[0]) === -1) { //if sorted
            merged.push(left.shift()) //push off left
        } else {
            merged.push(right.shift()) //push off right
        }
    }
    return merged.concat(left, right) //return whatever's left
}
let arr = [1, 6, 2, 4]
console.log(arr.mergeSort())


// Write a `Function.prototype.myBind(context)` method. It should return a copy
// of the original function, where `this` is set to `context`. It should allow 
// arguments to the function to be passed both at bind-time and call-time.

Function.prototype.myBind = function(context, ...bindArgs) {
    let that = this
    return function(...callArgs) {
        return that.apply(context, bindArgs.concat(callArgs))
    }
}


// Write a `Function.prototype.inherits(ParentClass)` method. It should extend
// the methods of `ParentClass.prototype` to `ChildClass.prototype`.
//
// **Do NOT use `Object.create`, `Object.assign`, `Object.setPrototypeOf`, or 
// modify the `__proto__` property of any object directly.**

Function.prototype.inherits = function(ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype
    this.prototype = new Surrogate()
    this.prototype.constructor = this
}


// Write a function `myCurry(fn, object, numArgs)`, that curries the function.
// Remember that a curried function is invoked with one argument at a time. For
// example, the curried form of `sum(1, 2, 3)` would be written as
// `curriedSum(1)(2)(3)`. After `numArgs` have been passed in, invoke the
// original `fn` with the accumulated arguments, using `object` as the
// context.

function myCurry(fn, object, numArgs) {
    let pot = []
    let bowl = object

    return function _stir(ingredient) {
        pot.push(ingredient)
        if (pot.length === numArgs) {
            return fn.bind(bowl)(...pot)
        } else {
            return _stir
        }
    }
}

