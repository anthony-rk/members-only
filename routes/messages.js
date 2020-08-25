var express = require('express');
var router = express.Router();

var message_controller = require('../controllers/messagesController');

/* GET messages for the /messages page. */
router.get('/', message_controller.get_message_list);

/* GET new post page. */
router.get('/new-post', message_controller.message_create_get);

/* POST new post page. */
router.post('/new-post', message_controller.message_create_post);

module.exports = router;