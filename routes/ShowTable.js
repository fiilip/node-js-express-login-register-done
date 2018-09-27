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
/*
router.post("/edit",function (req, res, next) {
    let connection = mysql.createConnection(dbConfig);
    let sp = "CALL getUsersWithId(?)";
    let input = req.body.idUser;

    connection.query(sp,input,(error, results, fields)=>{
        if(error){
            return console.error("error: " + error.message);
        }else{
            res.render("editUser", {title: "Edit User", data: results[0]});
        }
    });
    connection.end();
});

router.post("/" ,function (req, res, next) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {

        let connection = mysql.createConnection(dbConfig);
        let sp ="CALL updateUser(?,?,?)";
        let input = [req.body.idUser,req.body.username, hash];

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

*/
module.exports = router;