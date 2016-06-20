var express  = require('express');
var router   = express.Router();
var Profiles = getmodule('models/profiles');
var Logins   = getmodule('models/logins');
var Tables   = getmodule('models/tables');
var Clients   = getmodule('models/clients');
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
	.get([Token.validtoken,Logins.get])
	.put([Token.validtoken,Logins.update])
	.delete([Token.validtoken,Logins.delete])
	router.route('/users/name/:p')
	.get([Token.validtoken,Logins.getByUser])

router.route('/tables')
	.post([Token.validtoken,Tables.add])
router.route('/tables/:p')
	.get([Token.validtoken,Tables.get])
	.put([Token.validtoken,Tables.update])
	.delete([Token.validtoken,Tables.delete])

router.route('/clients')
	.post([Token.validtoken,Clients.add])
router.route('/clients/:p')
	.get([Token.validtoken,Clients.get])
	.put([Token.validtoken,Clients.update])
	.delete([Token.validtoken,Clients.delete])
	router.route('/clients/phone/:p')
	.get([Token.validtoken,Clients.getByPhone])

module.exports = router;
