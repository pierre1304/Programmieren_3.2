const express = require("express");
const fs = require('fs');
const app = express();

/*app.get("/name/:name", function(req, res){
    let name = req.params.name;
    res.send("<h1>hello " + name +"</h1>");
});

app.get("/website/:website", function(req, res){
    let website = req.params.website;
    res.redirect("https://www.google.com/search?q=" + website)
});

app.use(express.static('./GameOfLife'))

app.get("/GameOfLife", function(req, res){
    res.redirect("/index.html");
})

app.listen(3000, function(){
    console.log("test");
});

module.exports = class Square {
    constructor(side) {
        this.side = side;
    }
}*/

function main() {
    //let file = "hello.txt";
    //fs.appendFileSync(file, "Hello world\n");
    fs.writeFile('text.txt', "Hello world\n", function(err) {
        console.log("fs.writeFile ended");
    });
}
main();

var obj = 
{
    "first_name": "Vardan",
    "last_name": "Hovsepyan",
    "age": 13,
    "tumo_student": true
}

console.log(JSON.stringify(obj));
