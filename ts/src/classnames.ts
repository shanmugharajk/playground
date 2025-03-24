export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined
export type ClassDictionary = Record<string, any>
export type ClassArray = Array<ClassValue>

export default function classNames(...args: Array<ClassValue>): string {
  let out: string[] = []

  for (const arg of args) {
    if (!arg) {
      continue
    }

    let type = typeof arg

    if (type === 'string' || type === 'number') {
      out.push(String(arg))
      continue
    }

    if (Array.isArray(arg)) {
      out = out.concat(classNames(...arg))
      continue
    }

    if (type === 'object') {
      let obj = arg as ClassDictionary

      for (const key in obj) {
        if (Object.hasOwn(obj, key) && obj[key]) {
          out.push(key)
        }
      }
    }
  }

  return out.join(' ')
}

console.log(classNames('foo', 'bar')) // 'foo bar')
console.log(classNames('foo', { bar: true })) // 'foo bar')
console.log(classNames({ 'foo-bar': true })) // 'foo-bar')
console.log(classNames({ 'foo-bar': false }), '')
console.log(classNames({ foo: true }, { bar: true })) // 'foo bar')
console.log(classNames({ foo: true, bar: true })) // 'foo bar')
console.log(classNames({ foo: true, bar: false, qux: true })) // 'foo qux')
