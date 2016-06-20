var express  = require('express');
var router   = express.Router();
var Profiles = getmodule('models/profiles');
var Logins   = getmodule('models/logins');
var Token   = getmodule('api_modules/token');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.route('/profiles')
	.get([Token.validtoken, Profiles.all])
	.post([Token.validtoken, Profiles.create]);

router.route('/profiles/:id')
	.get([Token.validtoken,Profiles.get])
	.delete([Token.validtoken, Profiles.delete])
	.put([Token.validtoken, Profiles.update]);

router.route('/login')
	.post(Logins.do)

router.route('/users')
	.post([Token.validtoken,Logins.add])

router.route('/users/:p')
	.get([Token.validtoken,Logins.getByUser])
	.put([Token.validtoken,Logins.update])
	.delete([Token.validtoken,Logins.delete])

// router.post('/query', function(req, res){
//   var q = req.body.query;
//   req.getConnection(function(err,connection){
//         connection.query(q,[],function(err,result){
//             if(err) return res.status(400).json(err);

//             return res.status(200).json(result);
//         });
//   });
// });

module.exports = router;
