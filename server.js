const express= require("express");
const https = require("https");
const bodyParser = require("body-parser");


app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");

})

app.post("/",function(req,res)
{
    var city = req.body.cityName;
    const api = "6d1347b01fef03c1ec2afae58b196643";
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?q=" + city+ "&appid=" + api + "&units=metric";

    https.get(apiurl,function(response)
    {
        response.on("data",function(data)
        {
            content = JSON.parse(data);
            var temp = content.main.temp;
            var desc = content.weather[0].description;   

            res.write("<h1> Current Temperature at " + city + " is "+ temp + "</h1>");
            res.write("<h2> The weather shows " + desc + "</h2>");
            res.send()
        })
        
    })
})

app.listen(3000,function()
{
    console.log("server started on port 3000");
})