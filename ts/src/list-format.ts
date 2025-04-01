let SEPARATOR = ', '
let OTHERS_SEPARATOR = ' and '
let OTHERS_LABEL = ' other'

function listFormat(
  itemsParam: Array<string>,
  options?: { sorted?: boolean; length?: number; unique?: boolean }
): string {
  // Filter falsey values.
  let items = itemsParam.filter((item) => !!item)

  if (!items || items.length === 0) {
    return ''
  }

  // No processing is needed if there's only one item.
  if (items.length === 1) {
    return items[0]
  }

  // Sort values.
  if (options?.sorted) {
    items.sort()
  }

  // Remove duplicate values.
  if (options?.unique) {
    items = Array.from(new Set(items))
  }

  if (
    options?.length < 0 ||
    options?.length >= items.length ||
    !Boolean(options?.length)
  ) {
    let firstPart = items.slice(0, items.length - 1)
    let secondPart = items[items.length - 1]

    return firstPart.join(SEPARATOR) + OTHERS_SEPARATOR + secondPart
  }

  let firstPart = items.slice(0, options.length)
  let secondPart = items.slice(options.length, items.length)
  let suffix = secondPart.length > 1 ? 's' : ''

  return (
    firstPart.join(SEPARATOR) +
    OTHERS_SEPARATOR +
    secondPart.length +
    OTHERS_LABEL +
    suffix
  )
}

console.log(listFormat(['Bob', 'Ben', 'John', 'shan', 'kum'], { length: 3 }))

// Invalid case - so return the case where length not specified
console.log(listFormat(['Bob', 'Ben', 'John', 'shan', 'kum'], { length: -1 }))
