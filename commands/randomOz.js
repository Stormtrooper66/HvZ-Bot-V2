const { randomInt } = require('crypto');

module.exports = {
    name:'randomoz',
    description:'makes an player an original zombie.',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        if(!message.member.roles.cache.find(r => (r.name === "HvZ Head" || r.name === "Staff"))) return; //admin/staff only command
        if(args.length != 1) {message.reply("Incorrect number of arguments\nCommand Format: !randomOz (number of OZ's)"); return;}//makes sure the command is used properly

        const ozcount = args[0];//for readability
        
        if(savedData.PlayerCounts.Humans <= 1) {message.reply(`Can't create OZ's, there are not enough humans.`); return;};
        if(ozcount >= savedData.PlayerCounts.Humans) {message.reply(`Too many OZ's requested. Number must be below ${savedData.PlayerCounts.Humans}.`); return;};
        
        message.channel.send("Infecting Some Humans...");
        
        var ozpositions = [];
        while(ozpositions.length < ozcount)
        {
            var num = randomInt(savedData.Player_Tracking.length);
            var duplicate = false;
            for (var check = 0; check < ozpositions.length; check++)
            {
                if(ozpositions[check] == num) duplicate = true;
                if(savedData.Player_Tracking[num].Status === "Admin" || savedData.Player_Tracking[num].Status === "Zombie") duplicate = true;
                console.log(ozpositions.length+","+num+","+savedData.Player_Tracking[num].Status+","+savedData.Player_Tracking[num].Username,",Skip?:"+duplicate);
            }
            if(!duplicate) ozpositions.push(num);
        }

        for(var ozinfected = 0; ozinfected < ozpositions.length; ozinfected++)
        {
            //grab target's data

            console.log(savedData.Player_Tracking[ozpositions[ozinfected]].Username);

            const targetData = savedData.Player_Tracking[ozpositions[ozinfected]];
            console.log(targetData);
            /*console.log(ozinfected+","+ozpositions[ozinfected]+","+targetData.ID);
            message.guild.members.fetch(targetData).then(tar => {
                tar.roles.add(zombierole);
                tar.roles.remove(humanrole);
            });
            //console.log(target.user);
            */
            
            //update target's status
            
            targetData.Status = "Zombie";
            targetData.hasBounty = false;

            //update player counters
            savedData.PlayerCounts.Humans = savedData.PlayerCounts.Humans - 1;
            savedData.PlayerCounts.Zombies = savedData.PlayerCounts.Zombies + 1;

            //gets the user and updates their roles
            message.guild.members.fetch(targetData.ID).then(tar => {
                let humanrole = message.guild.roles.cache.find(r => r.name === "Human");
                let zombierole = message.guild.roles.cache.find(r => r.name === "Zombie");
                let bountyrole = message.guild.roles.cache.find(r => r.name === "Bounty");

                tar.roles.add(zombierole);
                tar.roles.remove(humanrole);
                tar.roles.remove(bountyrole);
                //console.log(tar);
                //cause fear
                //console.log(`${tar.user} has been randomly Infected as an Origional Zombie!\nRun for your lives!`);
                message.channel.send(`${tar.user} has been randomly Infected as an Origional Zombie!\nRun for your lives!`);
            }).catch(err => {
                console.log(err);
            });

            
            
        }

        message.channel.send("All random OZ's have been chosen!");

        const fs = require('fs');
        fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));
    }
}