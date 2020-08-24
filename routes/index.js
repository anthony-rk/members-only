var express = require('express');
var router = express.Router();

var message_controller = require('../controllers/messagesController');

/* GET home page. */
router.get("/", (req, res) => {
  // res.render("index", {message_controller.get_message_list, user: req.user});
  res.render("index", { title: 'Message Board', user: req.user,  message_list: message_controller.get_message_list, });
});

module.exports = router;