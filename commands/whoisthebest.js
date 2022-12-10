const { randomInt } = require('crypto');

module.exports = {
    name:'whoisthebest',
    description:'An easter egg command',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        var num = randomInt(5);

        if(num == 0){
            message.guild.members.fetch("217814652778708993").then(tar => {
                message.channel.send(`${tar.user}`);
            }) //straight up just pings Zach lol
        }
        else if(num == 1){message.channel.send("Well obviously it must be you")}
        else if(num == 2){

            var highestkills = 0;
            var highestkilluser;
            savedData.Player_Tracking.forEach(player => {
                if(player.KillCount > highestkills){
                    highestkilluser = player;
                }
            });
            message.guild.members.fetch(highestkilluser.ID).then(tar => {
                message.channel.send(`Maybe ${tar.user}, they have the most kills`);
            }).catch(err => {
                console.log(err);
            });
        }
        else if(num == 3){message.channel.send("I'm the bot, so it must be me")}
        else {message.channel.send("Well the humans will die, so it's not them, it must be a zombie")}

    }
}