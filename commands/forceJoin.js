const { randomInt } = require('crypto');
const JoinGame = require('./JoinGame');

module.exports = {
    name:'forcejoin',
    description:'forces a server member into the game and DMs both the player and admin the feedcode',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        if(!message.member.roles.cache.find(r => (r.name === "HvZ Head" || r.name === "Staff"))) return; //admin/staff only command
        if(args.length != 1) {message.reply("Incorrect number of arguments\nCommand Format: !forceJoin @playername"); return;}
        
        var parsedId = 0;
        if(args[0].length > 18)
        {
            parsed1 = args[0].substring(2,18);
            parsed2 = args[0].substring(18,args[0].length-1);
            parsedId = parsed1+parsed2;
        }else{parsedId = args[0].substring(2,args[0].length-1);}
        var target;
        try{
        target = message.guild.members.cache.find(mem => mem.id === parsedId);
        }catch{message.reply("Incorrect usage\nCommand Format: !forceJoin @playername"); return;}
        
        var alreadyIn = false; 
        var empty = false;

        const playerDiscord = target.user.username;
        const playerID = target.id;

        let humanrole = message.guild.roles.cache.find(r => r.name === "Human");
        let zombierole = message.guild.roles.cache.find(r => r.name === "Zombie");

        savedData.Player_Tracking.forEach(player => {
            if(player.ID == playerID){
                console.log("Player "+ target.user.username +" is already signed up.");
                alreadyIn = true;
            }
        });

        if(savedData.Player_Tracking.length == 0){empty = true;}
        if(alreadyIn) return;
            

        const feedCode = randomInt(1000,9999);
        var status = "Human";
        const killCount = 0;

        if(target.roles.cache.find(r => r.name === "HvZ Head")){
            status = "Admin";
        }

        if(status === "Human"){savedData.PlayerCounts.Humans = savedData.PlayerCounts.Humans + 1;}

        var thisPlayer = {};
        thisPlayer.ID = playerID;
        thisPlayer.Username = playerDiscord;
        thisPlayer.FeedCode = feedCode;
        thisPlayer.Status = status;
        thisPlayer.KillCount = killCount;
        thisPlayer.ObjCleared = false;

        savedData.Player_Tracking.push(thisPlayer);

        target.createDM().then(user => (user.send(JoinGame.BotMessage(target.user,thisPlayer.FeedCode))));
        message.author.createDM().then(user => (user.send("Feed Code for Player: "+`${target.user}: **${thisPlayer.FeedCode}**`)));

        const fs = require('fs');
        fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));

        if(status === "Human"){target.roles.add(humanrole);}
        if(status === "Admin"){target.roles.add(humanrole).then(target.roles.add(zombierole))}
    }
}
