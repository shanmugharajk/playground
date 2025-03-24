type ArrayValue = any | Array<ArrayValue>

export default function flatten(value: Array<ArrayValue>): Array<any> {
  let out: any[] = []

  for (const item of value) {
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
  for (const item of value) {
    if (Array.isArray(item)) {
      yield* flattenWithGenerator(item)
    } else {
      yield item
    }
  }
}

const nestedArray = [1, [2, 3], [4, [5, 6]], 7]
const flattened1 = [...flattenWithGenerator(nestedArray)]
console.log('Flattened array:', flattened1)
