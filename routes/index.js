var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: 'Message Board', user: req.user });
});

module.exports = router;