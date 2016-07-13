var jerror = require('../api_modules/json-error');

exports.perm = function(req, res, next){
	req.profiles = [1,2,3,4];
	next();
};


exports.add = function(req, res){
	var data = req.body;

	if(isNaN(data.order_source) || data.order_source == 0){
		return res.status(400).json({err:"Origem do pedido inválido"});
	}

	if(data.user == null || data.user == ""){
		return res.status(400).json({err:"Usuário inválido"});
	}

	req.getConnection(function(err,connection){
		if(err) return res.status(400).json(jerror(err));

    connection.query('SELECT id FROM logins WHERE user = ?', [data.user], function(err,result){
      if(err) return res.status(400).json(jerror(err));

      if(Object.keys(result).length > 0){
        delete data.user;
        data.user_id = result[0].id;
        connection.query('INSERT INTO orders SET ?;',[data],function(err,result){
    			if(err) return res.status(400).json(jerror(err));

    			return res.status(200).json(result);
    		});
      }
      else{
        return res.status(400).json({err:"Usuário não encontrado no sistema"});
      }
    })
	});
}

exports.get = function(req, res){
	var id = req.params.p;
	req.getConnection(function(err, connection){
		if(err) return res.status(400).json(jerror(err));

		connection.query(
			'SELECT * FROM orders WHERE id = ?',
			[id],
			function(err, result){
				if (err) return res.status(400).json(jerror(err));

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
			'DELETE FROM orders WHERE id = ?',
			[id],
			function(err, result){
				if (err) return res.status(400).json(jerror(err));

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

    if(data.user == null) data.user="";

    connection.query('SELECT id FROM logins WHERE user = ?', [data.user], function(err,result){
      if(Object.keys(result).length > 1){
        data.user_id = result[0].id;
      }
      delete data.user;

      connection.query(
        'UPDATE orders SET ? WHERE id = ?',
        [data, id],
        function(err, result){
          if (err) return res.status(400).json(jerror(err));
          return res.status(200).json(result);
        }
      )
    })
  });
}
