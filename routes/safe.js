const express = require("express");
const router = express.Router();
const authenticationMiddleware = require("../workers/authenticationMiddleware");

router.get("/", authenticationMiddleware(),function (req, res, next) {
   res.render("safe",{title:"safe"});
});

module.exports = router;