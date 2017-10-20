// Our Twitter library
var Twit = require('twit');

var debug = false;

var number = 0;

// We need to include our configuration file
var T = new Twit(require('./config.js'));

//WordnikAPI
var wordnikAPIKey = '0a19bd1cc18a0b8ac900f0d0c7b0385e1dd304a17f3102980';
var request = require('request');
var inflection = require('inflection');
var capitalize = inflection.capitalize;
var pre;	// store prebuilt strings here.

//Synonym Wordnik
//http://api.wordnik.com:80/v4/word.json/grotesque/phrases?limit=5&wlmi=0&useCanonical=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5
function grotesqueSyn() {
	return "http://api.wordnik.com:80/v4/word.json/ugly/relatedWords?useCanonical=false&relationshipTypes=equivalent&limitPerRelationshipType=20&api_key="+wordnikAPIKey;
}

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

// var search = {q: "#graphicdesign", count: 100, result_type: "recent", filter:"images", include_entities:true};

function tweet() {
	var tweetText = pre.pick();

	if (debug)
		console.log(tweetText);
	else
		T.post('statuses/update', {status:tweetText}, function(err, reply) {
			if (err !== null) {
				console.log('Error: ', err);
			}
			else {
				console.log('Tweeted: ', tweetText);
			}
		});
}

function runBot() {
	console.log(" "); // just for legible logs
	var d=new Date();
	var ds = d.toLocaleDateString() + " " + d.toLocaleTimeString();
	console.log(ds);  // date/time of the request

	// Get 200 nouns with minimum corpus count of 5,000 (lower numbers = more common words)
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

		///----- NOW DO THE BOT STUFF
		var rand = Math.random();

 		if(rand <= 1.60) {
			console.log("-------Tweet something");
			tweet();
			//retweetLatest();

		} else if (rand <= 0.80) {
			console.log("-------Tweet something @someone");
			respondToMention();

		} else {
			console.log("-------Follow someone who @-mentioned us");
			followAMentioner();
		}
	});
}

// runBot();
// setInterval(runBot, 1000*5);
runBot();
