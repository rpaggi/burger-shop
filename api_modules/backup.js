exports.perm = function(req, res, next){
	req.profiles = [1];
	next();
};

exports.do = function(req,res){
  req.getConnDump(function(err){
    if(err) return res.status(400).json(err);

    return res.status(200).json("{0}")
  });
}
