var jerror = getmodule('api_modules/json-error');
var _tablename = "order_itens"

exports.perm = function(req, res, next){
	req.profiles = [1,2,3,4];
	next();
};

exports.add = function(req, res){

	var data = req.body;

	if(isNaN(data.productId) || data.productId == 0){
		return res.status(400).json({err:"Produto inválido"});
	}

	if(isNaN(data.orderId) || data.orderId == 0){
		return res.status(400).json({err:"Peiddo inválido"});
	}

	req.getConnection(function(err,connection){
		if(err) return res.status(400).json(jerror(err));

		connection.query('INSERT INTO '+ _tablename +' SET ?;',[data],function(err,result){
			if(err) return res.status(400).json(jerror(err));

			return res.status(200).json(result);
		});
	});
}

exports.get = function(req, res){
	var id = req.params.p;
	req.getConnection(function(err, connection){
		if(err) return res.status(400).json(jerror(err));

		connection.query(
			'SELECT * FROM '+ _tablename +' WHERE id = ?',
			[id],
			function(err, result){
				if(err) return res.status(400).json(jerror(err));

				return res.status(200).json(result);
			}
		)
	});
}

exports.delete = function(req, res){
	var id = req.params.p;
	req.getConnection(function(err, connection){
		if(err) return res.status(400).json(jerror(err));

		connection.query(
			'DELETE FROM '+ _tablename +' WHERE id = ?',
			[id],
			function(err, result){
				if(err) return res.status(400).json(jerror(err));

				return res.status(200).json(result);
			}
		)
	});
}

exports.update = function(req, res){
	var id = req.params.p;
	var data = req.body;

	req.getConnection(function(err, connection){
		if(err) return res.status(400).json(jerror(err));

		connection.query(
			'UPDATE '+ _tablename +' SET ? WHERE id = ?',
			[data, id],
			function(err, result){
				if(err) return res.status(400).json(jerror(err));

				return res.status(200).json(result);
			}
		)
	});
}
