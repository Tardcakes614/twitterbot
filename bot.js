//Tells our console that the bot is starting
console.log("The Bot is starting now!");

//Require the twit package
var Twit = require('twit');
var T = new Twit({
    consumer_key: 'sM26wBMFD1JUUMtpRKfbbIPuk',
    consumer_secret: 'E5AcediTFfDVE8KxdC7AIbeGJcIugxG4DBq52ARKgs8csA4Cdo',
    access_token: '847899153543815168-hX7zY7C3MWoBomTfZzv6ekJDU9Bjv4D',
    access_token_secret: 'ADBeBGshQsNk7zXN3PYCFfT5WsVLHPpjQo4uUMXL5i5HP',
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
})


//GET -> search by hashtag, location, user, etc
//POST -> Post tweets
//STREAM -> follows, you can @ them, mentions, you can @ them

//

//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//
//var parameters = { 
//    q: 'apple since:2011-07-11', 
//    count: 2,

// search twitter for all tweets containing the word 'banana' since July 11, 2011
//
var tweets;

var parameters = {
    q: 'meme since:2017-05-11',
    count: 1,

    lang: 'en'

}




//T.get('search/tweets', parameters, gotData);
//
//function gotData(err, data, response){
//    
// tweets = data.statuses;
//    
//    for(var i = 0; i < tweets.length; i++){
//        
//       console.log(tweets[i].id); 
//    }
//   
//}
retweet();
setInterval(retweet, 1000 * 200);

function retweet() {
    T.get('search/tweets', parameters, found);

    function found(err, data, response) {

        tweets = data.statuses;

        for (var i = 0; i < tweets.length; i++) {

            console.log(tweets[i].id);

            var idt = tweets[i].id_str;
            console.log("this is the idt, " + idt);


            var tweet = {
                id: '862791015882797000'
            };

            T.post('statuses/retweet/:id', {
                id: idt
            }, repost);

            function repost(err, data, response) {

                if (err) {
                    console.log("retweet did bad!");
                } else {
                    console.log("retweet did good!");
                }


            }


        }

    }
}


//    var idt = tweets[0];
//    
//    var tweet = {id: idt};   
// 
//    T.post('statuses/retweet/:id', tweet , gotData);   
//    
//    function gotData(err, data, response){
//            
//            if (err){
//                console.log("retweet did bad!");
//            }else{
//                console.log("retweet did good!");
//            }
//            
//            
//        }
//   
//    }









//var tweet = { status: 'hello world!' }
//



//POST TWEET
//tweetIt();

//setInterval(tweetIt, 1000*45);

//function tweetIt() {
//Find a random real number from 0 to 1 and multiply by 100, and then round down
// var r = Math.floor(Math.random() * 100);

// var tweet = {
//     status: 'Here is the current random number ' + r + ' #providencehigh #phs #ecs #2017'
// }

// T.post('statuses/update', tweet, gotData);

// function gotData(err, data, response) {
//  if (err) {
//       console.log("Something went wrong!");

//  } else {
//     console.log("It posted!");
// }
// }
//}

//STREAM FUNCTION 

//followTweet();

function followTweet() {

    var stream = T.stream('user');
    //Anything someone follows me
    stream.on('follow', followed);

    function followed(eventMsg) {
        var name = eventMsg.source.name;
        var screenName = eventMsg.source.screen_name;
        tweetIt2('@' + screenName + ' WELCOME FELLOW PATRIOT, TOGETHER WE CAN DESTROY THE COMMIE SCUM!!!!!!!');



        var fs = require('fs');
        console.log('finished tweet json');
        var json = JSON.stringify(eventMsg, null, 2);
        fs.writeFile("tweet.json", json);
    }
}




function tweetIt2(txt) {
    var tweet = {
        status: txt

    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if (err) {
            console.log("Something went wrong!");
        } else {
            console.log("You were followed");
        }

    }

}

//function tweetIt2(txt) {
//    var tweet = {
//        status: txt
//
//    }
//
//    T.post('statuses/update', tweet, tweeted);
//
//    function tweeted(err, data, response) {
//        if (err) {
//            console.log("Something went wrong!");
//        } else {
//            console.log("You were followed");
//        }
//
//    }
//
//}


//var exec = require('child_process').exec;
//var cmd = '"C:\Users\juan.lopez\Downloads\processing-3.3\processing-java.exe" --sketch="H:\P5ECS\Lesson 20\circlesketch" --run';
//exec(cmd, processing);




//var fs = require('fs');
//processing();
//function processing(){
//    console.log("uploaded image");
//    var filename = 'pictures/AMERICA.JPG';
//    
//    var parameters = {
//        encoding: 'base64'
//    }
//    
//    var b64 = fs.readFileSync(filename, parameters);
//    
//    //i have to upload before i can tweet it
//    T.post('media/upload', {media_data: b64}, uploaded);
//    
//    function uploaded(err, data, response){
//        //This is where I will tweet! 
//        //My picture has a unique ID
//        var id = data.media_id_string;
//        var tweet = {
//            
//            status: '#AMERICA',
//            media_ids: [id]
//        }
//        
//        
//        T.post('statuses/update', tweet, tweeted);
//        
//        function tweeted(err, data, response){
//            
//            if (err){
//                console.log("Something went wrong!");
//            }else{
//                console.log("It posted!");
//            }
//            
//            
//        }
//        
//    }
//
//}

var fs = require('fs');
//processing();
function processing() {
    console.log("uploaded image");
    var filename = 'pictures/AMERICA.JPG';

    var parameters = {
        encoding: 'base64'
    }

    var b64 = fs.readFileSync(filename, parameters);

    //i have to upload before i can tweet it
    T.post('media/upload', {
        media_data: b64
    }, uploaded);

    function uploaded(err, data, response) {
        //This is where I will tweet! 
        //My picture has a unique ID
        var id = data.media_id_string;
        var tweet = {

            status: '#AMERICA',
            media_ids: [id]
        }


        T.post('statuses/update', tweet, tweeted);

        function tweeted(err, data, response) {

            if (err) {
                console.log("Something went wrong!");
            } else {
                console.log("It posted!");
            }


        }

    }

}




