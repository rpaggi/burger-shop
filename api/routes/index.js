var express = require('express');
var router = express.Router();
var Profiles = getmodule('src/profiles');

/* GET home page. */
router.get('/', function(req, res, next) {
 	res.render('index', { title: 'Express' });
});

router.route('/profiles')
  .get(Profiles.all)
  .post(Profiles.create);

router.route('/profiles/:id')
  .get(Profiles.get)
  .delete(Profiles.delete)
  .put(Profiles.update);

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