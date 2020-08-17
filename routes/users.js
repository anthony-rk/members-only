var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');


/// USER ROUTES ///

/* GET users listing. */
router.get('/user', user_controller.get_user_list);

module.exports = router;
