export function isOnServer() {
  return !!(typeof process === 'object' && process + '' === '[object process]')
}

export function keyBy(list, keyName) {
  const result = {}
  list.forEach(function(item) {
      result[item[keyName]] = item
  })
  return result
}

export function createPromiseWatchMiddleware() {
  const promises = []
  const middleware = () => (next) => (action) => {
    if (action && action.then) {
      promises.push(action)
    }

    return next(action)
  }
  middleware.wait = () => Promise.all(promises)

  return middleware
}
