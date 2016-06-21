module.exports = function(mysqlDump, dbConf){
  return function(req, res, next){
    req.getConnDump = function(callback){
      mysqlDump(dbConf,function(err){
        if(err) return callback(err);
        return callback(null);
      })
    }
    next();
  }
};
