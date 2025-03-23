export default function debounce(func: Function, wait: number): Function {
  let timerId: number | undefined

  return function (...args: unknown[]) {
    if (timerId) {
      clearTimeout(timerId)
    }

    let context = this

    timerId = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

let i = 0

function increment() {
  i++
}

let debouncedFunction = debounce(increment, 1000)
let timerId: number | undefined
let noOfTimesExecuted = 0

timerId = setInterval(function () {
  noOfTimesExecuted++
  debouncedFunction()
}, 10)

// stop calling after 500 ms. so here noOfTimesExecuted  50
setTimeout(() => {
  clearInterval(timerId)
  console.log(`the no of times called the fn = ${noOfTimesExecuted}`)
}, 400)

// wait time (1 s) + timer stop (400 ms) = 1400s
// the i should be 1, though we called multiple times
setTimeout(() => {
  console.log(`the value of i = ${i}`)
}, 1400)
