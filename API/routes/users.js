var express = require('express');
var router = express.Router();

var registerService = require("../services/registerService")

router.post('/', function(req, res, next) {
  registerService.createUser(req.body,function(err,data){
    console.log(data);
    if(!err) {
      res.json(data);
    } else {
      res.json(err);
    }
  })
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  registerService.getUsers(function(err,data){
    console.log(data);
    if(!err) {
      res.json(data);
    } else {
      res.json(err);
    }
  })
});
router.post('/login', function(req, res, next) {
  registerService.loginUser(req.body, function(err, data){
      if(err) {
          res.json(err);
      } else {
          res.json(data);
      }
  })
})

module.exports = router;
