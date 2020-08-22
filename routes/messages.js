var express = require('express');
var router = express.Router();

var message_controller = require('../controllers/messagesController');

/* GET new post page. */
router.get('/new-post', message_controller.message_create_get);

module.exports = router;