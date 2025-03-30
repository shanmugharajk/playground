function deepClone<T>(value: T): T {
  if (typeof value !== 'object' || value === null) {
    return value
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item)) as T
  }

  let result = {} as T
  
  for (let v in value) {
    result[v] = deepClone(value[v])
  }

  return result
}

console.log('\n1) ==')
let obj1: any = { user: { role: 'admin', values: [1, 2, 3, { id: 4 }] } }
let clonedObj1 = deepClone(obj1)
console.log(JSON.stringify(clonedObj1))
console.log(JSON.stringify(obj1))

console.log('\n2) ==')
obj1 = { user: 'shan', age: 38 }
clonedObj1 = deepClone(obj1)
console.log(JSON.stringify(clonedObj1))
console.log(JSON.stringify(obj1))

console.log('\n3) ==')
obj1 = ['shan', 38]
clonedObj1 = deepClone(obj1)
console.log(JSON.stringify(clonedObj1))
console.log(JSON.stringify(obj1))

console.log('\n4) ==')
console.log(Object.fromEntries(new Array(['bike', 'cbr 650R'])))
