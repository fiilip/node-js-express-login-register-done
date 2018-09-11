const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const dbConfig = require("../workers/dbConfig");
const bcrypt = require("bcrypt");

router.post("/" ,function (req, res, next) {
    bcrypt.hash(req.body.password, 10, function (err, hass) {

        let connection = mysql.createConnection(dbConfig);
        let sp ="CALL updateUser(?,?,?)";
        let input = [req.body.idUser,req.body.username, hass];

        connection.query(sp, input, (error, results, fields) => {
            if (error){
                return console.error("error: " + error.message);
            }else{

                res.redirect("/");
            }
        });
        connection.end();
    });
});

module.exports = router;