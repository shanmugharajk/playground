let sessions = [
  { user: 8, duration: 50, equipment: ['bench'] },
  { user: 7, duration: 150, equipment: ['dumbbell'] },
  { user: 1, duration: 10, equipment: ['barbell'] },
  { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
  { user: 7, duration: 200, equipment: ['bike'] },
  { user: 2, duration: 200, equipment: ['treadmill'] },
  { user: 2, duration: 200, equipment: ['bike'] },
]

type Session = { user: number; duration: number; equipment: Array<string> }

function mergeData(sessions: Array<Session>): Array<Session> {
  let cache = new Map()
  let results: Array<Session> = []

  for (let item of sessions) {
    let prev = cache.get(item.user)

    if (prev) {
      prev.duration += item.duration
      prev.equipment.push(...item.equipment)
    } else {
      let cloned = { ...item, equipment: [...item.equipment] }
      results.push(cloned)
      cache.set(item.user, cloned)
    }
  }

  return results.map((value) => ({
    ...value,
    equipment: Array.from(new Set(value.equipment)).sort(),
  }))
}

console.log(mergeData(sessions))
