const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/", passport.authenticate("local",{
    successRedirect: "/safe",
    failureRedirect: "/"
}));

module.exports = router;