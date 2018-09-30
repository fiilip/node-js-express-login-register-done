const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const dbConfig = require("../workers/dbConfig");
const bcrypt = require("bcrypt");
const authenticationMiddleware = require("../workers/authenticationMiddleware");


router.get('/',authenticationMiddleware(), function(req, res, next) {
    let connection = mysql.createConnection(dbConfig);

    let sp= "CALL users()";

    connection.query(sp, (error, results, fields) =>{
        if (error){
            return console.error("error: " + error.message);
        }else{
            res.render('Table', {
                title: 'Birtun úr DB',
                data: results[0]
            });
        }
    });
    connection.end();
});

module.exports = router;