var express      = require('express');
var router       = express.Router();
var Profiles     = getmodule('models/profiles');
var Logins       = getmodule('models/logins');
var Tables       = getmodule('models/tables');
var Orders       = getmodule('models/orders');
var Clients      = getmodule('models/clients');
var OrderSources = getmodule('models/order-sources');
var Token        = getmodule('api_modules/token');
var Backup       = getmodule('api_modules/backup');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.route('/profiles')
	.get([Profiles.perm,Token.validtoken, Profiles.all])
router.route('/profiles/:id')
	.get([Profiles.perm,Token.validtoken,Profiles.get])

	router.route('/order-sources')
		.get([OrderSources.perm,Token.validtoken, OrderSources.all])
	router.route('/order-sources/:id')
		.get([OrderSources.perm,Token.validtoken,OrderSources.get])

router.route('/login')
	.post(Logins.do)
router.route('/users')
	.post([Logins.perm,Token.validtoken,Logins.add])
router.route('/users/:p')
	.get([Logins.perm,Token.validtoken,Logins.get])
	.put([Logins.perm,Token.validtoken,Logins.update])
	.delete([Logins.perm,Token.validtoken,Logins.delete])
	router.route('/users/name/:p')
	.get([Logins.perm,Token.validtoken,Logins.getByUser])

router.route('/tables')
	.post([Tables.perm,Token.validtoken,Tables.add])
router.route('/tables/:p')
	.get([Tables.perm,Token.validtoken,Tables.get])
	.put([Tables.perm,Token.validtoken,Tables.update])
	.delete([Tables.perm,Token.validtoken,Tables.delete])
	.get([Logins.perm,Token.validtoken,Logins.getByUser])

router.route('/orders')
	.post([Orders.perm,Token.validtoken,Orders.add])
router.route('/orders/:p')
	.get([Orders.perm,Token.validtoken,Orders.get])
	.put([Orders.perm,Token.validtoken,Orders.update])
	.delete([Orders.perm,Token.validtoken,Orders.delete])

router.route('/clients')
	.post([Clients.perm,Token.validtoken,Clients.add])
router.route('/clients/:p')
	.get([Clients.perm,Token.validtoken,Clients.get])
	.put([Clients.perm,Token.validtoken,Clients.update])
	.delete([Clients.perm,Token.validtoken,Clients.delete])
router.route('/clients/phone/:p')
	.get([Clients.perm,Token.validtoken,Clients.getByPhone])

router.route('/backup')
	.get([Backup.perm,Token.validtoken,Backup.do])

module.exports = router;
