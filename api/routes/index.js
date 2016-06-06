var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 	res.render('index', { title: 'Express' });
});

router.get('/profiles', function(req, res) {
  req.getConnection(function(err,connection){
        connection.query('Select * from profiles;',[],function(err,result){
            if(err) return res.status(400).json(err);

            return res.status(200).json(result);
        });
  });
});

router.get('/profiles/:id', function(req, res) {
  var id = req.params.id;
  req.getConnection(function(err,connection){
        connection.query('Select * from profiles where id = ?;',[id],function(err,result){
            if(err) return res.status(400).json(err);

            return res.status(200).json(result);
        });
  });
});

module.exports = router;
