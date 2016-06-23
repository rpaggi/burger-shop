module.exports = function(err){
  return JSON.stringify(err, ["name", "message", "code", "arguments", "type"])
}
