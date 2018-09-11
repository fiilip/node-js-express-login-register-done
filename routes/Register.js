const express = require('express');
const router = express.Router();


router.post("/", function (req, res, next) {
    res.render("RegisterUser",{title:"Register"});
});



module.exports = router;