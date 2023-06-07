const express = require("express");
const app = express();

/*app.get("/name/:name", function(req, res){
    let name = req.params.name;
    res.send("<h1>hello " + name +"</h1>");
});

app.get("/website/:website", function(req, res){
    let website = req.params.website;
    res.redirect("https://www.google.com/search?q=" + website)
});*/

app.use(express.static('./GameOfLife'))

app.get("/GameOfLife", function(req, res){
    res.redirect("/index.html");
})

app.listen(3000, function(){
    console.log("test");
});

