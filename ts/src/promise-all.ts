type ReturnValue<T> = { -readonly [P in keyof T]: Awaited<T[P]> }

function promiseAll<T extends readonly unknown[] | []>(
  iterable: T
): Promise<ReturnValue<T>> {
  return new Promise((resolve, reject) => {
    let results = new Array(iterable.length)
    let unresolved = iterable.length

    if (unresolved === 0) {
      resolve(results as ReturnValue<T>)
      return
    }

    iterable.forEach(async (item, index) => {
      try {
        results[index] = await item
        unresolved -= 1

        if (unresolved === 0) {
          resolve(results as ReturnValue<T>)
        }
      } catch (err) {
        reject(err)
      }
    })
  })
}
