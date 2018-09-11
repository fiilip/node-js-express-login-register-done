const express = require("express");
const router = express.Router();

router.post("/", function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;