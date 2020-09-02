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

// Had to add this to App.js for some reason...
//
/* POST user Log-In. */
// router.post('/log-in', user_controller.user_login_post);

/* GET User Membership Join Page. */
router.get('/membership', user_controller.get_user_membership_form);

/* POST User Membership Join Page. */
router.post('/membership', user_controller.post_user_membership_form);
// router.post('./become-a-member', user_controller.test_fn);

/* GET User Membership Admin Join Page. */
router.get('/membership/admin', user_controller.get_user_membership_admin_form);

/* POST User Membership Admin Join Page. */
router.post('/membership/admin', user_controller.post_user_membership_admin_form);

module.exports = router;
