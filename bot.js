var Discord = require('discord.io');
var logger = require('winston');
var daysSince = [];
var daysSinceDays = [];
var prevDay;
var day;
var capsMess;
var dayChanger;
var changeDay = false;
var dayChangeWhich;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: process.env.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	
	capsMess = message.toUpperCase();
	
    if (message.substring(0, 1) == '^') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
	    
	if (true){
		let thisTime = new Date();
			let thisHour = (thisTime.getHours() - 4);
			let thisDay = thisTime.getDate();
			if (thisHour < 0){
				thisDay = thisDay - 1;
				thisHour = 24 + thisHour;
			}
			if (thisDay < 1){
				thisDay = monthNumbers[thisTime.getMonth()];
			}
		
		prevDay = day;
		day = thisDay;
		
		if (day != prevDay){
			for (var incrementing = 0; incrementing < daysSinceDays.length; incrementing++){
				daysSinceDays[incrementing]++;
			}
		}
	}
	    
	    if (changeDay && dayChanger == userID){
		    bot.sendMessage({
			    to: channelID,
			    message: 'Ok, your counter has been set to ' + message + ' days'
		    });
		    daysSinceDays[dayChangeWhich] = message;
	    }
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
			break;
		case 'addNewDaysSince':
			daysSince[daysSince.length] = message.substring(17);
			daysSinceDays[daysSinceDays.length] = 0;
			bot.sendMessage({
				to: channelID,
				message: 'Ok, your counter, ' + daysSince[daysSince.length - 1] + ', has been created'
			});
          	break;
				case 'howManySince':
					let quib = -1;
					for (var testing = 0; testing < daysSince.length; testing++){
						if (capsMess.substring(14) == (daysSince[testing]).toUpperCase()){
							quib = testing;
						}
					}
					if (quib == -1){
						bot.sendMessage({
							to: channelID,
							message: 'Sorry, that counter hasn\'t been developed yet'
						});
					}
					else {
						bot.sendMessage({
							to: channelID,
							message: daysSinceDays[quib] + ' days'
						});
					}
					break;
		case 'setDays':
			for (var setTest = 0; setTest < daysSince.length; setTest++){
						if (capsMess.substring(9) == (daysSince[setTest]).toUpperCase()){
							dayChangeWhich = setTest
							bot.sendMessage({
								to: channelID,
								message: 'Ok, please enter the number of days you want to set your counter to'
							});
							dayChanger = userID;
						}
					}
			break;
				case 'reset':
					for (var restTest = 0; restTest < daysSince.length; restTest++){
						if (capsMess.substring(7) == (daysSince[restTest]).toUpperCase()){
							daysSinceDays[restTest] = 0;
							bot.sendMessage({
								to: channelID,
								message: 'Ok, your counter, ' + daysSince[restTest] + ' has been reset to 0 days'
							});
						}
					}
					break;
		case 'help':
			bot.sendMessage({
				to: channelID,
				message: 'Documentation has been sent to the DMs.'
			});
			bot.sendMessage({
				to: userID,
				message: 'Our commands are: \n addNewDaysSince [counter] -- makes a new counter that will increase daily. \n howManySince [counter] -- returns the number of days the counter has \n setDays [counter] -- will prompt you to respond with a number, and will then set the counter to that number of days \n reset [counter] -- will reset the number of days in a counter to 0
			});
		default:
			bot.sendMessage({
				to: channelID,
				message: 'Sorry, I don\'t recognize that command.'
			});
			break;
			
            // Just add any case commands if you want to..
         }
     }
});
