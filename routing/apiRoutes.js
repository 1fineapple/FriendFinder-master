
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendMatches = require("../data/friends.js");

// Your apiRoutes.js file should contain two routes:

module.exports= function (app){
// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function(req,res){
        res.json(friendMatches);

        console.log(friendMatches);
    });



// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

    app.post("/api/friends",function(req,res){        
        
        var userData = req.body;
        var userName= userData.name;
        var userPhoto= userData.photoImg;
        var  userScore= userData.chosen;
        var match = { name:"", photo:"", score:1000};
        var totalDifference = 0;

        console.log("userData:");
        console.log(userData);
        
        
        for  (var i= 0; i < friendMatches.length; i++){

            console.log("Friend to compare:");
            console.log(friendMatches[i].scores);

            totalDifference = 0;
           
            for (var j=0; j< 10; j++){

              totalDifference += (Math.abs(parseInt(userScore[j]) - parseInt(friendMatches[i].scores[j])));

            };

            if(totalDifference <= match.score){
                match.name = friendMatches[i].name;
                match.photo = friendMatches[i].photo;
                match.score = totalDifference;
            };
            
        };
        friendMatches.push(userData);
        res.json(match);
 
    });

};
