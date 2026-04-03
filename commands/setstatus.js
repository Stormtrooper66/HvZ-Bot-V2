module.exports = {
    name:'setstatus',
    description:'force sets a players role to human, zombie, or admin',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        if(!message.member.roles.cache.find(r => (r.name === "HvZ Head" || r.name === "Staff"))) return; //admin/staff only command
        if(args.length != 2) {message.reply("Incorrect number of arguments\nCommand Format: !setstatus @playername (human/zombie/admin)"); return;}//makes sure the command is used properly

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
        }catch{message.reply("Incorrect usage\nCommand Format: !setstatus @playername (human/zombie/admin)"); return;}
        if(targetData == undefined){message.reply("Error 404: Player not found"); return;}

        //grab what to set them to
        var targetStatus = args[1].toString().toLowerCase();

        //update target's status
        let humanrole = message.guild.roles.cache.find(r => r.name === "Human");
        let zombierole = message.guild.roles.cache.find(r => r.name === "Zombie");
        let adminrole = message.guild.roles.cache.find(r => r.name === "HvZ Head");

        if(targetStatus == "human"){
            if(targetData.Status == "Zombie"){
                savedData.PlayerCounts.Humans = savedData.PlayerCounts.Humans + 1;
                savedData.PlayerCounts.Zombies = savedData.PlayerCounts.Zombies - 1;
            }else if(targetData.Status == "Admin"){
                savedData.PlayerCounts.Humans = savedData.PlayerCounts.Humans + 1;
            }

            targetData.Status = "Human";
            target.roles.remove(zombierole);
            target.roles.remove(adminrole);
            target.roles.add(humanrole);
        }
        if(targetStatus == "zombie"){
            if(targetData.Status == "Human"){
                savedData.PlayerCounts.Humans = savedData.PlayerCounts.Humans - 1;
                savedData.PlayerCounts.Zombies = savedData.PlayerCounts.Zombies + 1;
            }else if(targetData.Status == "Admin"){
                savedData.PlayerCounts.Zombies = savedData.PlayerCounts.Zombies + 1;
            }

            targetData.Status = "Zombie";
            target.roles.remove(humanrole);
            target.roles.remove(adminrole);
            target.roles.add(zombierole);
        }
        if(targetStatus == "admin"){
            if(targetData.Status == "Human"){
                savedData.PlayerCounts.Humans = savedData.PlayerCounts.Humans - 1;
            }else if(targetData.Status == "Zombie"){
                savedData.PlayerCounts.Zombies = savedData.PlayerCounts.Zombies - 1;
            }

            targetData.Status = "Admin";
            target.roles.remove(zombierole);
            target.roles.remove(humanrole);
            target.roles.add(adminrole);
        }

    }
}