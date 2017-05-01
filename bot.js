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
//
//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//
//this is a test
var parameters = {
    q: 'banana since:2011-07-11',
    count: 2,
    lang: 'es'

}

//T.get('search/tweets', parameters, gotData);


//function gotData(err, data, response){

//var tweets = data.statuses;

//for(var i =0; i < tweets.length; i++){

//console.log(data.statuses[i].text);

// }
//}



//var tweet = { status: 'hello world!' }


//T.post('statuses/update', tweet, gotData);





//GET -> search by hastag, location, user, etc

//POST -> Post tweets

//STREAM -> follows, you can @ them, mentons you can @ them


//POST TWEET
tweetIt();

//function tweetIt() {
    //var r = Math.floor(Math.random() * 100);

    //var tweet = {
     //   status: 'Here is the current random number ' + r + '#providencehigh #phs #ecs # 2017 #pepsi'
    //}


   // T.post('statuses/update', tweet, gotData);

   // function gotData(err, data, response) {
    //    if (err){
    //        console.log('It posted!');
   // } else {
   //     console.log("It posted!");
   // }

  //  }
//}
//var exec = require('child_process').exec;
//var cmd = '"C:\Users\17VelezSchulze.eric\Desktop\P5ECS-Nick\lesson 20>C:\Users\17VelezSchulze.eric\Desktop\P5ECS-Nick\processing-3.3\processing-java.exe" --sketch="C:\Users\17VelezSchulze.eric\Desktop\P5ECS-Nick\lesson 20\sketch_170407a" --run';


//var fs = require('fs');

//exec(cmd, processing);

f//unction processing(){
    
    c//onsole.log('finished image');
}
@@ -120,14 +120,46 @@ function tweetIt2(txt) {






function processing(eventMsg){
var fs = require('fs');
processing();
function processing(){
    console.log("uploaded image");
    var filename = 'AMERICA.jpg';
    
    console.log('finished image');
    var json = JSON.stringify(eventMsg, null, 2);
    fs.writeFile("tweet.json", json);
    var parameters = {
        encoding: 'base64'
    }
    
    var b64 = fs.readFileSync(filename, parameters);
    
    //i have to upload before i can tweet it
    T.post('media/upload', {media_data: b64}, uploaded);
    
    function uploaded(err, data, response){
        //This is where I will tweet! 
        //My picture has a unique ID
        var id = data.media_id_string;
        var tweet = {
            
            status: '#ECS2017 live from node.js',
            media_ids: [id]
        }
        
        
        T.post('statuses/update', tweet, tweeted);
        
        function tweeted(err, data, response){
            
            if (err){
                console.log("Something went wrong!");
            }else{
                console.log("It posted!");
            }
            
            
        }
        
    }

}
