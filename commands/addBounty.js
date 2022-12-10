module.exports = {
    name:'addbounty',
    description:'adds a player to the bounty list',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        if(!message.member.roles.cache.find(r => (r.name === "HvZ Head" || r.name === "Staff"))) return; //admin/staff only command
        if(args.length != 1) {message.reply("Incorrect number of arguments\nCommand Format: !addBounty @playername"); return;}//makes sure the command is used properly

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
        }catch{message.reply("Incorrect usage\nCommand Format: !addBounty @playername"); return;}

        //admins can't be revived
        if(targetData.Status === "Admin") {message.reply(`${target.user} is a game Admin, they cannot have a bounty.`); return;}

        //Zombies can't have bounties
        if(targetData.Status === "Zombie") {message.reply(`${target.user} is a Zombie, they cannot have a bounty.`); return;}

        //update target's status
        let bountyrole = message.guild.roles.cache.find(r => r.name === "Bounty");

        targetData.hasBounty = true;
        target.roles.add(bountyrole);

        //rejoin message
        message.channel.send(`${target.user} has a bounty on their head!`);

        const fs = require('fs');
        fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));
    }
}