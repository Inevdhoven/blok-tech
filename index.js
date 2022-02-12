const camelCase = require('camelcase');
const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send("hello world");
})

app.listen(3000)


console.log(camelCase('foo-bar'));
console.log(camelCase('ine-van-den-hoven'));