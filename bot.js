var Discord = require('discord.io');
var logger = require('winston');
var daysSince = [];
var daysSinceDays = [];
var prevDay;
var day;

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
						if (message.substring(14) == daysSince[testing]){
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
							message: daysSinceDays[testing] + ' days'
						});
					}
					break;
				case 'reset':
					for (var restTest = 0; restTest < daysSince.length; restTest++){
						if (message.substring(14) == daysSince[restTest]){
							daysSinceDays[restTest] = 0;
							bot.sendMessage({
								to: channelID,
								message: 'Ok, your counter, ' + daysSince[restTest] + ' has been reset to 0 das'
							});
						}
					}
					break;
			case 'orange':
				bot.sendMessage({
					to: channelID,
					message: '!fire'
				});
			break;
			
            // Just add any case commands if you want to..
         }
     }
});
