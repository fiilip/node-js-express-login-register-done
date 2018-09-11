const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const dbConfig = require("../workers/dbConfig");

router.post("/", function (req, res, next) {
    let connection = mysql.createConnection(dbConfig);
    let sp = "CALL deleteUser(?)";
    let input = req.body.idUser;

    connection.query(sp, input, (error, results, fields)=>{
        if(error){
            return console.error("error: " + error.message);
        }else{
            res.redirect("/");
        }
    });
    connection.end();
});

module.exports = router;