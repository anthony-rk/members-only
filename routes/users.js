var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

/// USER ROUTES ///

/* GET users listing. */
router.get('/', user_controller.get_user_list);

/* GET new user sign-up listing. */
router.get('/sign-up', user_controller.user_create_get);

/* POST new user sign-up listing. */
router.post('/sign-up', user_controller.user_create_post);

/* GET user Log-In. */
router.get('/log-in', user_controller.user_login_get);

/* POST user Log-In. */
// Had to add this to App.js for some reason
// router.post('/log-in', user_controller.user_login_post);

module.exports = router;
