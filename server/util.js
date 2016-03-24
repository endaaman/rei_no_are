

function extractDependingModuleCaches(name) {
  function inner(name, targets) {
    if (require.cache[name]) {
      targets[name] = true
      Object.keys(require.cache[name].children).forEach(function(key) {
        var child = require.cache[name].children[key]
        inner(child.filename, targets)
      })
    }
    return targets
  }
  return Object.keys(inner(name, {}))
}

function removeDependingModuleCaches(name, filter) {
  var targets = extractDependingModuleCaches(name)
  targets.forEach(function(name) {
    if (typeof filter !== 'function' || filter(name)) {
      delete require.cache[name]
    }
  })
}


module.exports = {
  extractDependingModuleCaches,
  removeDependingModuleCaches,
}
