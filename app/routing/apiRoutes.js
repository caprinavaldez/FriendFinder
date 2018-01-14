// Your apiRoutes.js file should contain two routes:
// A GET route with the url /api/friends. 
// This will be used to display a JSON of all possible friends.

var friendsData = require("../data/friends");

// ROUTING
module.exports = function(app) {
  // API GET Requests - code that handles when users "visit" a page.
  // When link is visited, a JSON of the data is shown in the table
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests - code that handles when user submits form & thus submits data to the server
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a survey... this data is then sent to the server...
  // Then the server saves the data to the scoresArray)
  // ---------------------------------------------------------------------------
  // A POST routes /api/friends. 
  // This will be used to handle incoming survey results. 
  // This route will also be used to handle the compatibility logic.

  app.post("/api/friends", function(req, res) {
    // req.body is available since we're using the body-parser middleware
    var newFriend = req.body.scores; //new friend's score
    var scoresArray = [];
    var bestMatch = 0; 
    var count = 0; 
    // for loop the current friendsData 
    for (var i = 0; i < friendsData.length; i++) {
        var totalDiff = 0;
        // for loop to compare the new friend with existing friend
        for (var j = 0; j < newFriend.length; j++) {
            //calculates the total difference of scores in new friend & friendsData
            totalDiff += (Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(newFriend[j])));
            //math.abs returns the absolute value of the number
        }
        // then add the json of new friend submission to the scoresArray 
        scoresArray.push(totalDiff);
    }
    // for loop to find best match after comparison with friendsData
    for (var i = 0; i < scoresArray.length; i++) {
        if (scoresArray[i] <= scoresArray[bestMatch]) {
            bestMatch = i;
        }
    }
    //return data
    var yourMatch = friendsData[bestMatch];
    res.json(yourMatch);
    friendsData.push(req.body);
  });
}