// to read and set any environment variables with the dotenv package:
require("dotenv").config();
var keys = require("./keys");
// console.log(keys); Working




var Twitter = require('twitter');
var client = new Twitter(keys.twitter);


var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var request = require('request');

var fs = require('fs');





// console.log("Welcome to Liri Node App!  Please enter one of four commands:");
// console.log("my-tweets");
// console.log("spotify-this-song");
// console.log("movie-this");
// console.log("do-what-it-says");
console.log("       **************  ");
console.log("          LIRI BOT     ");
console.log("       **************  ");






var argvOne = process.argv;
var argvTwo = process.argv[2];
var argvThree = process.argv[3];


//my-tweets
//spotify-this-song '<song name here>'
//movie-this
//do-what-it-says

function showLastTweets() {

    var twitterHandle = 'tlorenzo-liri';

    client.get('statuses/user_timeline', twitterHandle, function (error, tweets, response) {
        if (!error) {
            console.log("");
            console.log("The Latest:  Last 20 Tweets from @" + twitterHandle);
            console.log("");
            for (var i = 0; i < 20; i++) {

                var created = tweets[i].created_at;

                console.log("@tlorenzo-liri: " + tweets[i].text + " Tweeted: " + created.substring(0, 16));
                console.log("");


            }
        } else {
            console.log('Please try again.');
        }
    });



}

function spotifySong() {

    if (argvThree === undefined){
        
        
        
        spotify.search({ type: 'track', query: 'the sign ace of base' }, function(err, data) {
            
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
         

            var song = data.tracks.items[0];
            console.log ("Artist: " + song.artists[0].name);
            console.log("");
            console.log ("Song: " + song.name);
            console.log("");
            console.log ("Preview: " + song.preview_url);
            console.log("");
            console.log ("Album: " + song.album.name);
            console.log("");
            

        });

    }
    else {
        spotify.search({ type: 'track', query: argvThree }, function(err, data) {
            
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
         

            var song = data.tracks.items[0];
            console.log ("Artist: " + song.artists[0].name);
            console.log("");
            console.log ("Song: " + song.name);
            console.log("");
            console.log ("Preview: " + song.preview_url);
            console.log("");
            console.log ("Album: " + song.album.name);
            console.log("");
            

        });

    }
   










}

function movieThis() {


            if (argvThree == undefined) {
                argvThree = "mr+nobody";
                request("http://www.omdbapi.com/?t=" + argvThree + "&y=&plot=short&tomatoes=true&apikey=trilogy", function (error, response, body) {

                    if (!error && response.statusCode === 200) {
                        console.log("");
                        console.log("Film Title: " + JSON.parse(body).Title);
                        console.log("");
                        console.log("Year Released: " + JSON.parse(body).Year);
                        console.log("");
                        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                        console.log("");
                        console.log("Tomatometer: " + JSON.parse(body).Ratings[1].Value);
                        console.log("");
                        console.log("Country of Production: " + JSON.parse(body).Country);
                        console.log("");
                        console.log("Language: " + JSON.parse(body).Language);
                        console.log("");
                        console.log("Plot: " + JSON.parse(body).Plot);
                        console.log("");
                        console.log("Starring: " + JSON.parse(body).Actors);
                        console.log("");
                        console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");
                        console.log("");
                        console.log("It's on Netflix!");
                        console.log("");
                    } //close body

                });

            }

            else{
                request("http://www.omdbapi.com/?t=" + argvThree + "&y=&plot=short&tomatoes=true&apikey=trilogy", function (error, response, body) {

                    if (!error && response.statusCode === 200) {
                        console.log("");
                        console.log("Film Title: " + JSON.parse(body).Title);
                        console.log("");
                        console.log("Year Released: " + JSON.parse(body).Year);
                        console.log("");
                        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                        console.log("");
                        console.log("Tomatometer: " + JSON.parse(body).Ratings[1].Value);
                        console.log("");
                        console.log("Country of Production: " + JSON.parse(body).Country);
                        console.log("");
                        console.log("Language: " + JSON.parse(body).Language);
                        console.log("");
                        console.log("Plot: " + JSON.parse(body).Plot);
                        console.log("");
                        console.log("Starring: " + JSON.parse(body).Actors);
                        console.log("");
                        
                    } //close body

                });

                

            } //close else

    






}





function doThis() {
    fs.readFile("random.txt", "utf8", function(error, data) {

   
        if (error) {
          return console.log(error);
        }
      
     
        var arrayifiedData = data.split(",");

        if (arrayifiedData[0] === "movie-this") {
            argvThree = arrayifiedData[1]
            movieThis();
        } else if (arrayifiedData[0] === "spotify-this-song") {
            argvThree = arrayifiedData[1];
            spotifySong(argvThree);
        } 

      
      });

}






if (argvTwo === "my-tweets") {
    showLastTweets();

}

else if (argvTwo === "spotify-this-song") {
    spotifySong();


}

else if (argvTwo === "movie-this") {
    movieThis();


}

else if (argvTwo === "do-what-it-says") {
    doThis();
    

} 
else {
    console.log("Please enter a command.");
}

