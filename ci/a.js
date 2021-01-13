console.clear()

let arr = [46,78,19,45,67,87,12,64,98,35,15,85,96,45,78,15,36,101,88,1,48,74]
console.log('init', arr)

arr.sort((a, b) => b - a)
console.log('sortedArr', arr)

let sum1 = 0
let sum2 = 0
let arr1 = []
let arr2 = []

arr.forEach(el => {
  if(sum1 < sum2) {
    arr1.push(el)
    sum1 += el
  } else {
    arr2.push(el)
    sum2 += el
  }
})

console.log({arr1, sum1, arr2, sum2})