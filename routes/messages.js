var express = require('express');
var router = express.Router();

var message_controller = require('../controllers/messagesController');

/* GET new post page. */
router.get('/new-post', message_controller.message_create_get);

/* POST new post page. */
router.post('/new-post', message_controller.message_create_post);

/* GET Messages Page */
// router.get('/messages', message_controller.message_create_get);

module.exports = router;