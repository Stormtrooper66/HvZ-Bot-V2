const { randomInt } = require('crypto');

module.exports = {
    name:'joingame',
    description:'Add the player to the game, but only if they arent already in it',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        var alreadyIn = false; 
        var empty = false;

        const playerDiscord = message.author.username;
        const playerID = message.author.id;

        let humanrole = message.guild.roles.cache.find(r => r.name === "Human");
        let zombierole = message.guild.roles.cache.find(r => r.name === "Zombie");

        savedData.Player_Tracking.forEach(player => {
            if(player.ID == playerID){
                console.log("Player "+ message.author.username +" is already signed up.");
                alreadyIn = true;
            }
        });

        if(savedData.Player_Tracking.length == 0){empty = true;}

        if(alreadyIn) return;
            

        const feedCode = randomInt(1000,9999);
        var status = "Human";
        const killCount = 0;

        if(message.member.roles.cache.find(r => r.name === "HvZ Head")){
            status = "Admin";
        }

        var thisPlayer = {};
        thisPlayer.ID = playerID;
        thisPlayer.Username = playerDiscord;
        thisPlayer.FeedCode = feedCode;
        thisPlayer.Status = status;
        thisPlayer.KillCount = killCount;
        thisPlayer.hasBounty = false;
        thisPlayer.ObjCleared = false;

        savedData.PlayerCounts.Humans = savedData.PlayerCounts.Humans + 1;

        savedData.Player_Tracking.push(thisPlayer);

        message.author.createDM().then(user => (user.send(this.BotMessage(message.author, thisPlayer.FeedCode))));

        if(status === "Human"){message.member.roles.add(humanrole)}
        if(status === "Admin"){message.member.roles.add(humanrole).then(message.member.roles.add(zombierole))}

        const fs = require('fs');
        fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));
    },
    BotMessage(player, PlayerfeedCode) {
    
        returnString = `Thanks for joining HvZ, ${player}!\n!!!! Your FEED CODE is **${PlayerfeedCode}** !!!!\n\n`+
        "If you wish to play as a HUMAN, make sure you write down your FEED CODE and have it on you at all times"+
        "\n\nIf you wish to play as a ZOMBIE, contact the moderators to be added as an ORIGINAL ZOMBIE."+
        "\n\nAs a ZOMBIE, if you tag a HUMAN, enter the tag command with their username and 4-digit FEED CODE like this:"+
        "\n\n!tag @username XXXX"+
        "\n(make sure you use all commands in the hvz-commands channel)"+
        "\n\nIf you obtain a REVIVE token, give it to a moderator to have your role reset to human."+
        "\n\nTo see any player's zombie KILL COUNT, use this command:"+
        "\n!killcount @username"+
        "\n\n\nAlways remember rules 1-3"+
        "\n1. Don't be a jerk"+
        "\n2. Use good judgment"+
        "\n3. Have fun!";
        return returnString;
        /*
        Thanks for joining HvZ, @Strormtrooper!
        !!!! Your FEED CODE is 4722 !!!!
    
        If you wish to play as a HUMAN, make sure you write down your FEED CODE and have it on you at all times
    
        If you wish to play as a ZOMBIE, contact the moderators to be added as an ORIGINAL ZOMBIE.
    
        As a ZOMBIE, if you tag a HUMAN, enter the tag command with their username and 4-digit FEED CODE like this:
        !tag @username XXXX
        (make sure you use all commands in the hvz-commands channel)
    
        If you obtain a REVIVE token, give it to a moderator to have your role reset to human.
    
        To see any player's zombie KILL COUNT, use this command:
        !killcount @username
    
    
        Always remember rules 1-3
        1. Don't be a jerk
        2. Use good judgment
        3. Have fun!
        */
    }
}