module.exports = {
    name:'oz',
    description:'makes an player an original zombie.',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        if(!message.member.roles.cache.find(r => (r.name === "HvZ Head" || r.name === "Staff"))) return; //admin/staff only command
        if(args.length != 1) {message.reply("Incorrect number of arguments\nCommand Format: !Oz @playername"); return;}//makes sure the command is used properly

        
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
        }catch{message.reply("Incorrect usage\nCommand Format: !Oz @playername"); return;}

        //admins can't be OZ's
        if(targetData.Status === "Admin") {message.reply(`${target.user} is a game Admin, they cannot be an OZ.`); return;}

        //zombies also cannot be OZ's
        if(targetData.Status === "Zombie") {message.reply(`${target.user} is already a zombie, they cannot be an OZ.`); return;}

        //update target's status
        let humanrole = message.guild.roles.cache.find(r => r.name === "Human");
        let zombierole = message.guild.roles.cache.find(r => r.name === "Zombie");
        let bountyrole = message.guild.roles.cache.find(r => r.name === "Bounty");

        targetData.Status = "Zombie";
        targetData.hasBounty = false;
        target.roles.add(zombierole);
        target.roles.remove(humanrole);
        target.roles.remove(bountyrole);

        //update player counters
        savedData.PlayerCounts.Humans = savedData.PlayerCounts.Humans - 1;
        savedData.PlayerCounts.Zombies = savedData.PlayerCounts.Zombies + 1;

        //cause fear
        message.channel.send(`${target.user} is an Original Zombie!\nRun for your lives!`);

        const fs = require('fs');
        fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));
    }
}