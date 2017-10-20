# Kim the GFX Guru Twitter bot



## Installation

If you don't already have have them, please install [Node.js](http://nodejs.org/). This will install two programs: `node`, which runs JavaScript from the command line, and `npm`, which helps you install software that Node.js can run.

Make an empty project directory somewhere convenient for you and clone the files. Go to your project directory in the command line. There should be four files there: `.gitignore`, `README.md`, `bot3.js` and `config.js`. In that directory type:

`npm install twit`

This installs some code to the `npm_modules` subdirectory, which you don't need to worry about. (It's Twit, the library that lets us talk to Twitter.) You will also need to download the 'inflection' module.

## Connecting to Twitter

At this point you need to register a Twitter account and also get its "app info".

So create a Twitter account for whatever account you want to tweet this stuff. Twitter doesn't allow you to register multiple twitter accounts on the same email address. I recommend you create a brand new email address (perhaps using Gmail) for the Twitter account. Once you register the account to that email address, wait for the confirmation email. Then go here and log in as the Twitter account for your bot:

https://apps.twitter.com/app/new

Once you're there, fill in the required fields: name, description, website. None of it really matters at all to your actual app, it's just for Twitter's information. Do the captcha and submit.

Next you'll see a screen with a "Details" tab. Click on the "Settings" tab and under "Application Type" choose "Read and Write", then hit the update button at the bottom.

Then go to the Keys and Access Tokens tab, and at the bottom click "create my access token". Nothing might happen immediately. Wait a minute and reload the page. then there should be "access token" and "access token secret", which are both long strings of letters and numbers.

Now use a text editor to open up the "config.js" file. It should look like this:

```javascript
module.exports = {
  consumer_key:         'blah',
  consumer_secret:      'blah',
  access_token:         'blah',
  access_token_secret:  'blah'
}
```

In between those quotes, instead of `'blah'`, paste the appropriate info from the Details page. This is essentially the login information for the app.

Now type the following in the command line in your project directory:

`node bot.js`

Hopefully at this point you see a message like "Success! Check your bot, it should have retweeted something." Check the Twitter account for your bot, and it should have retweeted a tweet with the #mediaarts hashtag.

## Bot description
The Kim Kardashian GFX Guru is here to make sure you've got your designs in tact! Kim's gotten bored of reality TV and has discovered the next lucrative career: graphic design! But she's not that cut out for manual labor herself - oh God no! She'd much rather judge others! She's been taking some time off to read some books and has developed quite the vocabulary! Kind of. She likes to sprinkle big words occasionally, whether it's appropriate or not. She tends to like them to express feelings of disgust, so watch out! She's a harsh critic and calls herself the Simon Cowell of graphics. She's also been brushing up on design principles so you'll see her call people out on them. However, she's still the dramatic self that we know and love. Hear her #ICONIC quotes firsthand, and she has so many it's hard to dislike her, even when she's completely ratting on your artwork. You'll also see her retweeting her favorite #design tweets. She is loyal to her fans, though, so be sure to follow her!

##Interaction
Get her to respond to you by tweeting an image of your work with the hashtag #graphicdesign (she's always on the lookout). You can also tweet at her and she'll share her thoughts with you.

Want THE Kim Kardashian to like your tweet? Just tweet #art and she's bound to find you! She's always perusing the #art hashtag for her latest inspo! Something to make her feel more .. cultured.

Kim will retweet you if you include the #design hashtag in your tweet! She loves broadcasting some designs to make her twitter feed look nice.

Follow Kim and get your own shoutout from the queen of reality TV herself!

URL: https://twitter.com/ChrisBotLOL
