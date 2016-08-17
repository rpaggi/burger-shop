var express         = require('express');
var router          = express.Router();
var Profiles        = require('../models/profiles');
var Logins          = require('../models/logins');
var Tables          = require('../models/tables');
var Orders          = require('../models/orders');
var Clients         = require('../models/clients');
var OrderSources    = require('../models/order-sources');
var Products        = require('../models/products');
var ProductsDetails = require('../models/products-details');
var OrderItens      = require('../models/order-itens');
var Token           = require('../api_modules/token');
var Backup          = require('../api_modules/backup');

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

router.route('/products')
	.post([Products.perm,Token.validtoken,Products.add])
	.get([Products.perm,Token.validtoken,Products.all])
router.route('/products/:p')
	.get([Products.perm,Token.validtoken,Products.get])
	.put([Products.perm,Token.validtoken,Products.update])
	.delete([Products.perm,Token.validtoken,Products.delete])

router.route('/products-details')
	.post([ProductsDetails.perm,Token.validtoken,ProductsDetails.add])
	.get([ProductsDetails.perm,Token.validtoken,ProductsDetails.getAll])
router.route('/products-details/:p')
	.get([ProductsDetails.perm,Token.validtoken,ProductsDetails.get])
	.put([ProductsDetails.perm,Token.validtoken,ProductsDetails.update])
	.delete([ProductsDetails.perm,Token.validtoken,ProductsDetails.delete])
router.route('/products-details/product/:p')
	.get([ProductsDetails.perm,Token.validtoken,ProductsDetails.getProduct])
	.delete([ProductsDetails.perm,Token.validtoken,ProductsDetails.deleteProduct])

router.route('/order-itens')
	.post([OrderItens.perm,Token.validtoken,OrderItens.add])
router.route('/order-itens/:p')
	.get([OrderItens.perm,Token.validtoken,OrderItens.get])
	.put([OrderItens.perm,Token.validtoken,OrderItens.update])
	.delete([OrderItens.perm,Token.validtoken,OrderItens.delete])

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
