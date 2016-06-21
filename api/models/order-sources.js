exports.perm = function(req, res, next){
	req.profiles = [1,2,3];
	next();
};

exports.all = function(req, res) {
	req.getConnection(function(err,connection){
    connection.query('Select * from order_sources;',[],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
    });
  });
}

exports.get = function(req, res) {
    var id = req.params.id;

    req.getConnection(function(err,connection){
			connection.query('Select * from order_sources where id = ?;',[id],function(err,result){
				if(err) return res.status(400).json(err);

				return res.status(200).json(result);
      });
    });
}
