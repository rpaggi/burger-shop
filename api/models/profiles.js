var TokenGenerator = getmodule('api_modules/token');

exports.all = function(req, res) {
	if(!TokenGenerator.validtoken(req.get("token")))
		return res.status(400).json({"err":"Token inválido!"});

	req.getConnection(function(err,connection){
    connection.query('Select * from profiles;',[],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
    });
  });
}

exports.get = function(req, res) {
	if(!TokenGenerator.validtoken(req.get("token")))
		return res.status(400).json({"err":"Token inválido!"});

    var id = req.params.id;

    req.getConnection(function(err,connection){
			connection.query('Select * from profiles where id = ?;',[id],function(err,result){
				if(err) return res.status(400).json(err);

				return res.status(200).json(result);
      });
    });
}

exports.create = function(req, res) {
	if(!TokenGenerator.validtoken(req.get("token")))
		return res.status(400).json({"err":"Token inválido!"});

	var data = req.body;
	req.getConnection(function(err,connection){
		connection.query('INSERT INTO profiles SET ?;',[data],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
  });
}

exports.delete = function(req, res) {
	if(!TokenGenerator.validtoken(req.get("token")))
		return res.status(400).json({"err":"Token inválido!"});

	var id = req.params.id;
  req.getConnection(function(err,connection){
      connection.query('DELETE FROM profiles WHERE id = ?;',[id],function(err,result){
		if(err) return res.status(400).json(err);

		return res.status(200).json(result);
      });
  });
}

exports.update = function(req, res) {
	if(!TokenGenerator.validtoken(req.get("token")))
		return res.status(400).json({"err":"Token inválido!"});

	var id = req.params.id;
  var data = req.body;
  req.getConnection(function(err,connection){
    connection.query('UPDATE profiles SET ? WHERE id = ?;',[data, id],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
    });
  });
}
