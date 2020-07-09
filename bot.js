var Discord = require('discord.io');
var logger = require('winston');
var fs = require('fs');
var ranks = ["iron1","iron2","iron3","bronze1","bronze2","bronze3","silver1","silver2","silver3","gold1","gold2","gold3","platinum1","platinum2","platinum3","diamond1","diamond2","diamond3","immortal1","immortal2","immortal3","radiant"];
var ids = ["729918195473055765","729918441276047432","729919844882972693","729920155022262282","729920339206864961","729920341492629556","729920435084328990","729920436644741121","729920438389571635","729920440654495844","729920442273497088","729920443418673194","729920471293886565","729920472694915122","729920473852411974","729920475538522116","729920476586967122","729920477916823572","729920479997067305","729921322645454940","729921324339822653","729921410667118614"]

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

bot.on('disconnect', function(erMsg, code) {
    console.log('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
	bot.connect();
});

bot.on('messageReactionAdd', function(reaction){
	if (reaction.d.message_id == '730833641889988639'){
		var aRank = reaction.d.emoji.name; 
		for (var i = 0; i < ranks.length; i++){
			if (aRank == ranks[i]){
				bot.addToRole({
					serverID: '729912456515944530',
					userID: reaction.d.user_id,
					roleID: ids[i]
				});
			}
		}
	}
});

bot.on('messageReactionRemove', function(reaction){
	if (reaction.d.message_id == '730833641889988639'){
		var bRank = reaction.d.emoji.name;
		for (var i = 0; i < ranks.length; i++){
			if (bRank == ranks[i]){
				bot.removeFromRole({
					serverID: '729912456515944530',
					userID: reaction.d.user_id,
					roleID: ids[i]
				});
			}
		}
	}
});
