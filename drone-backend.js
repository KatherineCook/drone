var Cylon = require('cylon');
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
        driver: "ardrone",
        connection: "ardrone"
    })
    .on("ready", fly);

    
// Fly the bot
var bot;
function fly(robot) {
    bot=robot;
    bot.drone.config('general:navdata_demo', 'TRUE');
    bot.nav.on("navdata", function(data) {
        console.log(data);
    });
    bot.nav.on("navdata", function(data) {
        console.log("Altitude:", data);
        if (altitude>1.5){
            bot.drone.land();
        }
    });
    bot.drone.disableEmergency();
    bot.drone.ftrim();
    bot.drone.takeoff();
    after(10*1000, function() {
        bot.drone.land();
    });
    after(15*1000, function() {
        bot.drone.stop();
    });

}

Cylon.start();
