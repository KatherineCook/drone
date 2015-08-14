var Cylon = require('cylon');
var utils = require('./utils/droneUtils.js');




var bot;

// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .device("nav",{
        driver: "ardrone-nav",
        connection: "ardrone"
    })
    .on("ready", fly);

    
// Fly the bot
var bot;

function fly(robot) {
    bot=robot;
    //bot.drone.config('general:navdata_demo', 'TRUE');

    bot.drone.getPngStream()
        .on("data", utils.sendFrame);


    bot.nav.on("navdata", function(data) {
        //console.log(data);
    });
    bot.nav.on("altitudeChange", function(data) {
        console.log("Altitude:", data);
        if (data>1.5){
            bot.drone.land();
        }
    });
    bot.drone.disableEmergency();
    bot.drone.ftrim();

    bot.drone.takeoff();

    after(5*1000, function(){
        bot.drone.forward(0.05);
    });

    after(30*1000, function(){
        bot.drone.land();
    });

    after(35*1000, function(){
        bot.drone.stop();
    });

    /*bot.drone.takeoff();
    after(5*1000, function (speed) {
       bot.drone.forward(0.2);
    });

    after(6*1000, function(){
        bot.drone.hover(0.5*1000)
    });

    after(7*1000, function(speed){
        bot.drone.forward(0);
        bot.drone.right(0.2);
    });

    after(8*1000, function(){
        bot.drone.hover(0.5*1000)
    });

    after(9*1000, function(speed){
        bot.drone.forward(0);
        bot.drone.right(0);
        bot.drone.back(0.2);
    });

    after(10*1000, function(){
        bot.drone.hover(0.5*1000)
    });

    after(11*1000, function(speed){
        bot.drone.forward(0);
        bot.drone.right(0);
        bot.drone.back(0);
        bot.drone.left(0.2);
    });

    after(12*1000, function(){
        bot.drone.hover(0.5*1000)
    });

    after(13*1000, function() {
        bot.drone.land();
    });
    after(18*1000, function() {
        bot.drone.stop();
    });*/

}

function moveDrone(move) {
    if (move.left) {
        console.log("Moving left");
        bot.drone.left(0.2);
        bot.forward(0);
        after(0.5*1000, function() {
            bot.drone.left(0);
            bot.drone.forward(0.05);
        });
    }
    if (move.right) {
        console.log("Moving right");
        bot.drone.right(0.2);
        bot.forward(0);
        after(0.5*1000, function() {
            bot.drone.right(0);
            bot.drone.forward(0.05);
        });
    }
    /*if (move.forward){
     console.log("Moving forward");
     bot.drone.forward(0.2);
     }*/
}



Cylon.start();
