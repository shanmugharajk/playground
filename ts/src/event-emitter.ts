interface IEventEmitter {
  on(eventName: string, listener: Function): IEventEmitter

  off(eventName: string, listener: Function): IEventEmitter

  emit(eventName: string, ...args: Array<any>): boolean
}

class EventEmitter implements IEventEmitter {
  listeners = new Map<string, Function[]>()

  constructor() {}

  on(eventName: string, listener: Function): IEventEmitter {
    let existing = this.listeners.get(eventName) ?? []
    this.listeners.set(eventName, existing.concat(listener))
    return this
  }

  off(eventName: string, listener: Function): IEventEmitter {
    let listeners = this.listeners.get(eventName)

    if (!listeners?.length) {
      return this
    }

    // Find only first instance of the listener.
    let index = listeners.findIndex((listenerItem) => listenerItem === listener)

    if (index < 0) {
      return this
    }

    listeners.splice(index, 1)
    this.listeners.set(eventName, listeners)
    return this
  }

  emit(eventName: string, ...args: Array<any>): boolean {
    let listeners = this.listeners.get(eventName)

    if (listeners?.length) {
      listeners.forEach((listener) => listener(...args))
      return true
    }

    return false
  }
}
