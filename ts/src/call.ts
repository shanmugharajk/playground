interface Function {
  myCall(this: Function, thisArg: any, ...argArray: any[]): any
}

Function.prototype.myCall = function (thisArg, ...argArray) {
  const sym = Symbol()

  const wrapperObj = Object.create(thisArg)

  Object.defineProperty(wrapperObj, sym, {
    enumerable: false,
    value: this,
  })

  return wrapperObj[sym](...argArray)
}

function print() {
  console.log(this.age)
}

let obj = { age: 38 }
print.myCall(obj)
