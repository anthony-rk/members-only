var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Require controller modules.
// var messages_controller = require('../controllers/messagesController');
var user_controller = require('../controllers/userController');


/// BOOK ROUTES ///

// GET catalog home page.
router.get('/user', user_controller.get_user_list);

module.exports = router;