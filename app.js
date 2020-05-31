const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const axios = require("axios");


const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get("/", function(req,res){

    
    res.render('homepage');
});

app.post("/", function(req,res){
    const movieName = req.body.movieName;
    const url = "https://www.omdbapi.com/?apikey=86f9dde7&t="+movieName;
    axios.get(url).then(response => {

        if(response.data.Response === "True"){
            res.render('movieInfo', {
                movieTitle : response.data.Title, 
                moviePlot : response.data.Plot, 
                moviePoster : response.data.Poster,
                imdbRating : typeof response.data.Ratings[0] === 'undefined'? "-/-" :response.data.Ratings[0].Value ,
                rottenRating : typeof response.data.Ratings[1] === 'undefined'? "-/-" :response.data.Ratings[1].Value ,
                metacriticRating: typeof response.data.Ratings[2] === 'undefined'? "-/-" :response.data.Ratings[2].Value ,
                genre : response.data.Genre,
                director : response.data.Director,
                language : response.data.Language,
                awards : response.data.Awards,
                rated : response.data.Rated
            });
        } else{
            res.render('error');
        }

        
    })

});

app.post("/back", function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server Started at Port 3000");
});