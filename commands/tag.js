module.exports = {
    name:'tag',
    description:'Infects a player if the correct name and feedcode are entered',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        if(args.length != 2) {this.errorMessage(message); return;}//makes sure the command is used properly

        //get tagger's data
        var taggerData;
        savedData.Player_Tracking.forEach(player => {
            if(player.ID === message.author.id){
                taggerData = player;
            }
        });

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
        }
        catch(err){this.errorMessage(message); return;}

        //You can't tag yourself
        if(targetData.ID == message.author.id){message.reply("You can't tag yourself..."); return;};

        //Feed Code must match
        if(targetData.FeedCode != args[1]) {this.errorMessage(message); return;}

        //admins can't be tagged
        if(targetData.Status === "Admin") {message.reply(`${target.user} is a game Admin, they cannot be tagged`); return;}

        //Humans can't tag people
        if(taggerData.Status === "Human") {message.reply(`You're a human...\nYou can't tag other humans`); return;}

        //Zombies can't be tagged
        if(targetData.Status === "Zombie") {message.reply(`${target.user} is already a Zombie... \nYou can't tag a zombie twice`); return;}

        //update target's status
        let humanrole = message.guild.roles.cache.find(r => r.name === "Human");
        let zombierole = message.guild.roles.cache.find(r => r.name === "Zombie");

        targetData.Status = "Zombie";
        target.roles.add(zombierole);
        target.roles.remove(humanrole);

        //update player counters
        savedData.PlayerCounts.Humans = savedData.PlayerCounts.Humans - 1;
        savedData.PlayerCounts.Zombies = savedData.PlayerCounts.Zombies + 1;
        taggerData.KillCount = taggerData.KillCount + 1;

        //cause fear
        if(targetData.hasBounty){
            let bountyrole = message.guild.roles.cache.find(r => r.name === "Bounty");
            targetData.hasBounty = false;
            target.roles.remove(bountyrole);

            message.channel.send(`${message.author} has scratched ${target.user}'s name off the bounty list\nand now has ${taggerData.KillCount} kill(s)!\nReport to the moderators for your reward!`);
        }else{
            message.channel.send(`${message.author} tagged ${target.user}\nand now has ${taggerData.KillCount} kill(s)!`);
        }

        const fs = require('fs');
        fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));

    },
    errorMessage(message){
        message.reply(`${message.author}, your tag was not recorded!\nMake sure you:\n-Entered the feed code correctly\n-Entered the username correctly`/*\n-Have the zombie role in Discord\n-Are entering a tag on someone with the human role`*/);
    }
}