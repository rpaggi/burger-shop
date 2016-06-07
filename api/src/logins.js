var crypto = require('crypto');

exports.do = function(req, res) {
	var login    = req.body["login"];
	var password = req.body["password"];

	if(login == null){
		return res.status(400).json("Login em branco");
	}

	if(password == null){
		return res.status(400).json("Senha em branco");
	}

	cPassword = crypto.createHash('md5').update(password).digest("hex");

	req.getConnection(function(err,connection){
        connection.query('Select * from logins where login = ? and password = ?;',[login, cPassword],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
        });
    });
}