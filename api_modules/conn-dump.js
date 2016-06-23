function getFormattedDate(){
    var d = new Date();
		d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ('0' + d.getMinutes()).slice(-2) + ('0' + d.getSeconds()).slice(-2);
		return d;
}

module.exports = function(mysqlDump, dbConf){
  return function(req, res, next){
    req.getConnDump = function(callback){
      var arr = dbConf.backfile.split(".");
      dbConf.dest = '.'+ arr[1] + getFormattedDate() + "." + arr[2]
      dbConf.database = dbConf.db;

      mysqlDump(dbConf,function(err){
        if(err) return callback(err);
        return callback(null);
      })
    }
    next();
  }
};
