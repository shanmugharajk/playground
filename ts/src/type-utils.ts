function isArray(value: unknown) {
  return Array.isArray(value)
}

function isArrayAlt1(value: unknown) {
  // won't work when we change the ctor
  // e.g.
  // arr = []
  // arr.constructor = Object;
  return (value as any).constructor === Array
}

function isArrayAlt2(value: unknown) {
  return Object.prototype.toString.call(value) === '[object Array]'
}

function isFunction(value: unknown) {
  return typeof value === 'function'
}

export function isObject(value: unknown) {
  // For null and undefined.
  if (value == null) {
    return false
  }

  const type = typeof value
  return type === 'object' || type === 'function'
}

export function isPlainObject(value: unknown) {
  // For null and undefined.
  if (value == null) {
    return false
  }

  const prototype = Object.getPrototypeOf(value)
  return prototype === null || prototype === Object.prototype
}

// Alternative to isPlainObject, Lodash's implementation.
export function isPlainObjectAlternative(value: unknown) {
  if (!isObject(value)) {
    return false
  }

  // For objects created via Object.create(null);
  if (Object.getPrototypeOf(value) === null) {
    return true
  }

  let proto = value
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(value) === proto
}
