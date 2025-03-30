type ArrayValue = any | Array<ArrayValue>

export default function flatten(value: Array<ArrayValue>): Array<any> {
  let out: any[] = []

  for (let item of value) {
    if (Array.isArray(item)) {
      out = out.concat(flatten(item))
    } else {
      out.push(item)
    }
  }

  return out
}

export function flattenRecursive(value: Array<any>): Array<any> {
  while (value.some(Array.isArray)) {
    value = [].concat(...value)
  }

  return value
}

export function* flattenWithGenerator<T>(
  value: Array<T>
): Generator<T, void, unknown> {
  for (let item of value) {
    if (Array.isArray(item)) {
      yield* flattenWithGenerator(item)
    } else {
      yield item
    }
  }
}

let nestedArray = [1, [2, 3], [4, [5, 6]], 7]
let flattened1 = [...flattenWithGenerator(nestedArray)]
console.log('Flattened array:', flattened1)
