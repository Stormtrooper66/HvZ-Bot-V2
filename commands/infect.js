module.exports = {
    name:'infect',
    description:'turns player into a zombie because of objective failure',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        if(!message.member.roles.cache.find(r => (r.name === "HvZ Head" || r.name === "Staff"))) return; //admin/staff only command
        if(args.length != 1) {message.reply("Incorrect number of arguments\nCommand Format: !infect @playername"); return;}//makes sure the command is used properly

        
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
        }catch{message.reply("Incorrect usage\nCommand Format: !infect @playername"); return;}

        //admins can't be infect's
        if(targetData.Status === "Admin") {message.reply(`${target.user} is a game Admin, they cannot be infected.`); return;}

        //zombies also cannot be infected's
        if(targetData.Status === "Zombie") {message.reply(`${target.user} is already a zombie, they cannot be infected.`); return;}

        //update target's status
        let humanrole = message.guild.roles.cache.find(r => r.name === "Human");
        let zombierole = message.guild.roles.cache.find(r => r.name === "Zombie");

        targetData.Status = "Zombie";
        target.roles.add(zombierole);
        target.roles.remove(humanrole);

        //update player counters
        savedData.PlayerCounts.Humans = savedData.PlayerCounts.Humans - 1;
        savedData.PlayerCounts.Zombies = savedData.PlayerCounts.Zombies + 1;

        //cause fear
        message.channel.send(`${target.user} failed to complete the objective and has been infected`);

        const fs = require('fs');
        fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));
    }
}