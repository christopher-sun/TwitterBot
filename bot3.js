/*
1) Project Statement: The Kim Kardashian GFX Guru is here to make sure you've got your designs in tact! Kim's gotten bored of reality TV and has discovered the next lucrative career: graphic design! But she's not that cut out for manual labor herself - oh God no! She'd much rather judge others! She's been taking some time off to read some books and has developed quite the vocabulary! Kind of. She likes to sprinkle big words occasionally, whether it's appropriate or not. She tends to like them to express feelings of disgust, so watch out! She's a harsh critic and calls herself the Simon Cowell of graphics. She's also been brushing up on design principles so you'll see her call people out on them. However, she's still the dramatic self that we know and love. Hear her #ICONIC quotes firsthand, and she has so many it's hard to dislike her, even when she's completely ratting on your artwork. You'll also see her retweeting her favorite #design tweets. She is loyal to her fans, though, so be sure to follow her!

Get her to respond to you by tweeting an image of your work with the hashtag #graphicdesign (she's always on the lookout). You can also tweet at her and she'll share her thoughts with you.

Want THE Kim Kardashian to like your tweet? Just tweet #art and she's bound to find you! She's always perusing the #art hashtag for her latest inspo! Something to make her feel more .. cultured.

Kim will retweet you if you include the #design hashtag in your tweet! She loves broadcasting some designs to make her twitter feed look nice.

Follow Kim and get your own shoutout from the queen of reality TV herself!

NOTE: This script uses Node.js modules request, inflection, and twit.

2) https://twitter.com/ChrisBotLOL

3) -- */

// Dependencies =========================
var
    twit = require('twit'),
    config = require('./config');

var Twitter = new twit(config);

//WordnikAPI
var wordnikAPIKey = '0a19bd1cc18a0b8ac900f0d0c7b0385e1dd304a17f3102980';
var request = require('request');
var inflection = require('inflection');
var capitalize = inflection.capitalize;
var pre;	// store prebuilt strings here.
var word;
var mentions = 0;

// Setting up a user stream
var stream = Twitter.stream('user');

function grotesqueSyn() {
	return "http://api.wordnik.com:80/v4/word.json/ugly/relatedWords?useCanonical=false&relationshipTypes=equivalent&limitPerRelationshipType=20&api_key="+wordnikAPIKey;
}
function nastySyn() {
    return "http://api.wordnik.com:80/v4/word.json/nasty/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=20&api_key="+wordnikAPIKey;
}

// var min = Math.ceil(0);
// var max = Math.floor(100);
// var number = Math.floor(Math.random() * (max - min)) + min;
var number = 0;

// Helper functions for arrays, picks a random thing
Array.prototype.pick = function() {
	return this[Math.floor(Math.random()*this.length)];
}
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
var retweet = function() {
    var params = {
        q: '#design',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }
    // for more parametes, see: https://dev.twitter.com/rest/reference/get/search/tweets

    Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[number].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
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
    number++;
}

retweet();
setInterval(retweet,60000);

// REPLY BOT ==========================

// find latest tweet according the query 'q' in params
var reply = function() {
    var params = {
        q: '#graphicdesign',  // REQUIRED
        result_type: 'recent',
        filter: 'images',
        include_entities: true
    }
    Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[number].id_str;
            var userId = data.statuses[number].user.screen_name;
            var id = data.statuses[number].user.id_str;
            //var uId = data.statuses[number].user.user_id;

            request(grotesqueSyn(), function(err, response, data) {
                if (err != null) return;		// bail if no data
                adj = eval(data);

                pre = [
                    "Hey doll .. this split complementary color scheme is giving me like, major anxiety .. it's "+adj.pick().words.pick(),
                    "WOW! This is SO fab! Well, except for the serif font .. So "+adj.pick().words.pick(),
                    "I'm in such shock that this has to be a joke. Like, have you even heard of the Rule of Thirds? "+capitalize(adj.pick().words.pick())+"..",
                    "This "+adj.pick().words.pick()+" composition ... I feel like I'm literally on the verge of a nervous breakdown right now.",
                    "Even Nori knows more about Gestalt theory than you .. like, honestly! "+capitalize(adj.pick().words.pick())+"!",
                    "Is that .. Times New Roman? That is so RUDE. "+capitalize(adj.pick().words.pick())+"!",
                    "Honestly, it's like, "+adj.pick().words.pick()+" .. I think you should have used Helvetica",
                    "The fact that you used 5 different typefaces in 7 different sizes is super shady ... how "+adj.pick().words.pick(),
                    "If you know how I feel why would you make the kerning "+adj.pick().words.pick()+" like that? Like you put me in such an uncomfortable situation!",
                    "That "+adj.pick().words.pick()+" typeface on that image? Honey, would you put a bumper sticker on a Bentley?",
                    "I can't go like, shopping around Beverly Hills with this "+adj.pick().words.pick()+" CMYK color model! I NEED RGB!",
                    "There's a lot of baggage that comes with that choice of "+adj.pick().words.pick()+" gradient. But it's like Louis Vuitton baggage! A used one, though.",
                    "This "+adj.pick().words.pick()+" oversaturated pic makes me want to cry. But I'll cry at the end of the day. Not with fresh makeup.",
                    "Being on a reality show doesn't get the respect I feel it should. This "+adj.pick().words.pick()+" low-resolution pic doesn't deserve any, though",
                    "By the looks of this it seems like you finally designed your own brand identity! A "+adj.pick().words.pick()+" one. Buy my fashion line!",
                    "This brandmark just isn't that #iconic .. think KIMOJI.",
                    "Did you even TRY using a grid? The layout's all wrong. "+capitalize(adj.pick().words.pick()),
                    "You should add more white space in this pic .. get rid of some of the "+adj.pick().words.pick(),
                    "When there's so much happening in the ("+adj.pick().words.pick()+") foreground, I really don't care",
                    "If I like a food, I'll eat it, even if I know it's not good for more. I wouldn't eat this "+adj.pick().words.pick()+" pic though",
                    "I'm so stereotyped into being this Hollywood girl. I can tell you must be stereotyped into not knowing the Golden Ratio",
                    "Rule of thirds? More like Rule of "+capitalize(adj.pick().words.pick()),
                    "Personally, I've always loved the curvy look. On me. That "+adj.pick().words.pick()+" script has got to go!",
                    "You can't really have like, high end designers for everything.",
                    "My career is based on openness and honesty. This color palette is "+adj.pick().words.pick(),
                    "Slab serif? More like drab serf! "+capitalize(adj.pick().words.pick())
                ];
                Twitter.post('statuses/update', {
                    status:'@'+userId+" "+pre.pick(),
                    in_reply_to_status_id: retweetId
                }, function(err, response) {
                    if (response) {
                        console.log('Replied!!!');
                    }
                    // if there was an error while tweeting
                    if (err) {
                        console.log('Something went wrong while RETWEETING... Duplication maybe...');
                        console.log(err);
                    }
                });
            // if unable to Search a tweet
        });
    }
    else {
      console.log('Something went wrong while SEARCHING...');
    }
            });
// number = Math.floor(Math.random() * (max - min)) + min;
number++;
            // Tell TWITTER to retweet
}

// grab & retweet as soon as program is running... and retweet interval
reply();
setInterval(reply, 60000);

// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = function(){
  var params = {
      q: '#art', // REQUIRED
      result_type: 'popular',
      count: 100
  }
  // find the tweet
  Twitter.get('search/tweets', params, function(err,data){

    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);   // pick a random tweet

    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      // Tell TWITTER to 'favorite'
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // if there was an error while 'favorite'
        if(err){
          console.log('CANNOT BE FAVORITE... Error');
        }
        else{
          console.log('FAVORITED... Success!!!');
        }
      });
    }
  });
}
// grab & 'favorite' as soon as program is running...
favoriteTweet();
setInterval(favoriteTweet, 15000);

//respond to mention

// Now looking for tweet events
// See: https://dev.twitter.com/streaming/userstreams
stream.on('tweet', tweetEvent);

// Here a tweet event is triggered!
function tweetEvent(tweet) {

  // If we wanted to write a file out
  // to look more closely at the data
  // var fs = require('fs');
  // var json = JSON.stringify(tweet,null,2);
  // fs.writeFile("tweet.json", json, output);

  // Who is this in reply to?
  var reply_to = tweet.in_reply_to_screen_name;
  // Who sent the tweet?
  var name = tweet.user.screen_name;
  // What is the text?
  var txt = tweet.text;
  //response id
  var retweetId = tweet.id_str;

  // Ok, if this was in reply to me
  if (reply_to === 'ChrisBotLOL') {
      request(nastySyn(), function(err, response, data) {
          if (err != null) return;		// bail if no data
          adj = eval(data);

          pre = [
             "I hate when designers use "+adj.pick().words.pick()+" color schemes  ... do better",
             "Since I started graphic design, they say I look like a different ethnicity!",
             "Kanye always says 'Design sexier!' He's always the most encouraging",
             "North doesn't like pink or purple. She likes greys, creams, oatmeal colours and black. Think about that in your designs",
             "In recent years I'm, like, too cool for serif fonts. So that doesn't happen. Too "+adj.pick().words.pick(),
             "This isn't realistic for me to purchase. It only has "+adj.pick().words.pick()+" colors ..",
             "I once read that I was obsessed with tetriadic color schemes .. how "+adj.pick().words.pick(),
             "God is saying, 'You can design well but look what "+adj.pick().words.pick()+" designs I can make you do'",
             "Be honored Kanye calls you his 'Perfect "+capitalize(adj.pick().words.pick())+"'. I love it.'",
             "I would like, DIE to design for Apple!",
             "If it's overcast, you can't see the "+adj.pick().words.pick(),
             "I feel really blessed because I genuinely love the process of creating vector art",
             "I just feel like I can't function in the real world with short leading",
             "What gave you the right to think that you could be a UI/UX Designer?!"
          ];
    // Get rid of the @ mention
    txt = txt.replace(/@ChrisBotLOL/g,'');

    // Start a reply back to the sender
    var reply = '.@'+name + ' ';
    // Reverse their text
    // for (var i = txt.length-1; i >= 0; i--) {
    //   reply += txt.charAt(i);
    // }

    reply+=pre.pick();

    // Post that tweet!
    Twitter.post('statuses/update', { status: reply, in_reply_to_status_id: retweetId }, tweeted);

    // Make sure it worked!
    function tweeted(err, reply) {
      if (err !== undefined) {
        console.log(err);
      } else {
        console.log('Tweeted: ' + reply);
      }
    };
    });
  }
  }

// Anytime someone follows me
stream.on('follow', followed);

// Just looking at the event but I could tweet back!
function followed(event) {
  var name = event.source.name;
  var screenName = event.source.screen_name;
  //var idstr = event.source.id_str;
  console.log('I was followed by: ' + name + ' ' + screenName);
  console.log(screenName);
  request(nastySyn(), function(err, response, data) {
      if (err != null) return;		// bail if no data
      adj = eval(data);

      pre = [
         "Thanks for the follow, boo! You're so NOT "+adj.pick().words.pick()+"!",
         "Having lots of siblings is like having built-in best friends! Welcome to the fam!",
         "When there's so many haters and "+adj.pick().words.pick()+" things, I really don't care .. as long as you're here! Thanks for the follow!",
         "Thanks for joining the fam! .. I couldn't imagine coming from a small, "+adj.pick().words.pick()+" family ..",
         "First and foremost, I'm on Twitter for love .. and I love you! Thanks for the follow!"

      ];
      Twitter.post('statuses/update', {status:"@"+screenName+" "+pre.pick()}, function(err, response) {
          if (response) {
              console.log('Tweeted at follower');
          }
          // if there was an error while tweeting
          if (err) {
              console.log('Something went wrong while T@F... Duplication maybe...');
              console.log(err);
          }
      });
  });
}

function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};
