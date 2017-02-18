/* Setting things up. */
var path = require('path'),
    Twit = require('twit'),
    config = {
/* Be sure to update the .env file with your API keys. See how to get them: https://botwiki.org/tutorials/make-an-image-posting-twitter-bot/#creating-a-twitter-app*/
      twitter: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      }
    },
    T = new Twit(config.twitter),
    stream = T.stream('statuses/sample');

    // RETWEET BOT ==========================

    // find latest tweet according the query 'q' in params
    var retweet = function() {
        var params = {
            q: '#iamababy',  // REQUIRED
            result_type: 'recent',
            lang: 'en'
        }
        // for more parametes, see: https://dev.twitter.com/rest/reference/get/search/tweets

        T.get('search/tweets', params, function(err, data) {
          // if there no errors
            if (!err) {
              // grab ID of tweet to retweet
                var retweetId = data.statuses[0].id_str;
                // Tell TWITTER to retweet
                T.post('statuses/retweet/:id', {
                    id: retweetId
                }, function(err, response) {
                    if (response) {
                        console.log('Retweeted!!!');
                    }
                    // if there was an error while tweeting
                    if (err) {
                        console.log('Something went wrong while RETWEETING... Duplication maybe...');
                    }
                });
            }
            // if unable to Search a tweet
            else {
              console.log('Something went wrong while SEARCHING...');
            }
        });
    }
    
retweet();

setInterval(retweet, 300000000);

/**********************************************************************************************/
/* The code below takes care of serving the index.html file, no need to change anything here. */

var express = require('express');
var app = express();
app.use(express.static('public'));
listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
