interface Array<T> {
  myReduce<U>(
    callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U
}

Array.prototype.myReduce = function (callbackFn, initialValue) {
  let hasInitialValue = initialValue !== undefined
  let len = this.length

  if (len === 0 && !hasInitialValue) {
    throw new TypeError('Reduce of empty array with no initial value')
  }

  let accumulatedValue = hasInitialValue ? initialValue : this[0]

  let startingIndex = hasInitialValue ? 0 : 1

  for (let i = startingIndex; i < len; i++) {
    if (this[i] !== undefined) {
      accumulatedValue = callbackFn(accumulatedValue, this[i], i, this)
    }
  }

  return accumulatedValue
}

let arr = ['a', 'b', 'c']

let add = (prev: string, curr: string) => prev + curr

console.log(`reduce - ${arr.reduce(add, '')}`)
console.log(`myReduce - ${arr.myReduce(add, '')}`)
