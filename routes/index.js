const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const dbConfig = require("../workers/dbConfig");



/* GET home page. */
router.get('/', function(req, res, next) {
    let connection = mysql.createConnection(dbConfig);

    let sp= "CALL users()";

    connection.query(sp, (error, results, fields) =>{
        if (error){
            return console.error("error: " + error.message);
        }else{
            res.render('index', {
                title: 'Birtun úr DB',
                data: results[0]
            });
        }
    });
    connection.end();
});

//update edit

router.post("/edit",function (req, res, next) {
    let connection = mysql.createConnection(dbConfig);
    let sp = "CALL getUsersWithId(?)";
    let input = req.body.idUser;

    connection.query(sp,input,(error, results, fields)=>{
        if(error){
    return console.error("error: " + error,message);
    }else{
            res.render("editUser", {title: "Edit User", data: results[0]});
        }
    });
    connection.end();

});
module.exports = router;
