const { randomInt } = require('crypto');
const JoinGame = require('./JoinGame');

module.exports = {
    name:'revive',
    description:'returns a player to the human role',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        if(!message.member.roles.cache.find(r => (r.name === "HvZ Head" || r.name === "Staff"))) return; //admin/staff only command
        if(args.length != 1 && args.length != 2) {message.reply("Incorrect number of arguments\nCommand Format: !Revive @playername (noCode)"); return;}//makes sure the command is used properly

        //grab target's data
        var parsedId = 0;
        if(args[0].length > 18)
        {
            parsed1 = args[0].substring(2,18);
            parsed2 = args[0].substring(18,args[0].length-1);
            parsedId = parsed1+parsed2;
        }else{parsedId = args[0].substring(2,args[0].length-1);}
        var target;
        var targetData;
        try{
        target = message.guild.members.cache.find(mem => mem.id === parsedId);
        targetData = savedData.Player_Tracking.find(player => player.ID === target.user.id);
        }catch{message.reply("Incorrect usage\nCommand Format: !Revive @playername (noCode)"); return;}

        //admins can't be revived
        if(targetData.Status === "Admin") {message.reply(`${target.user} is a game Admin, they cannot be revived.`); return;}

        //Humans can't be revived
        if(targetData.Status === "Human") {message.reply(`${target.user} is already a human, they cannot be revived.`); return;}

        //update target's status
        let humanrole = message.guild.roles.cache.find(r => r.name === "Human");
        let zombierole = message.guild.roles.cache.find(r => r.name === "Zombie");

        if(args.length == 2 && args[1] === "noCode"){
            console.log("No new feed code will be generated");
        }else{
            targetData.FeedCode = randomInt(1000,9999);
        }

        targetData.Status = "Human";
        target.roles.remove(zombierole);
        target.roles.add(humanrole);

        //update player counters
        savedData.PlayerCounts.Humans = savedData.PlayerCounts.Humans + 1;
        savedData.PlayerCounts.Zombies = savedData.PlayerCounts.Zombies - 1;

        //rejoin message
        message.channel.send(`${target.user} is back in the game and ready to blast some zeds!`);
        target.createDM().then(user => (user.send(JoinGame.BotMessage(target.user,targetData.FeedCode))));

        const fs = require('fs');
        fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));
    }
}