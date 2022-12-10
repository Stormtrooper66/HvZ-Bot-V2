module.exports = {
    name:'midnightobj',
    description:'checks if players have completed the objective and automatically infects',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        if(!message.member.roles.cache.find(r => (r.name === "HvZ Head" || r.name === "Staff"))) return; //admin/staff only command

        const fs = require('fs');
        
        message.channel.send("Time's up!\nHumans who have failed the Objective will now be infected and turn into Zombies");
        var anyfails = false;
        savedData.Player_Tracking.forEach(player => {
            if(!player.ObjCleared && player.Status === "Human"){
                if(!anyfails){
                    message.channel.send("The Humans who failed are:");
                }
                anyfails = true;
                message.guild.members.fetch(player.ID).then(failure => {
                    
                    //update target's status
                    let humanrole = message.guild.roles.cache.find(r => r.name === "Human");
                    let zombierole = message.guild.roles.cache.find(r => r.name === "Zombie");

                    player.Status = "Zombie";
                    failure.roles.add(zombierole);
                    failure.roles.remove(humanrole);

                    //update player counters
                    savedData.PlayerCounts.Humans = savedData.PlayerCounts.Humans - 1;
                    savedData.PlayerCounts.Zombies = savedData.PlayerCounts.Zombies + 1;
                    
                    //add name to list
                    if(player.hasBounty){
                        let bountyrole = message.guild.roles.cache.find(r => r.name === "Bounty");
                        failure.roles.remove(bountyrole);
                        player.hasBounty = false;
                        message.channel.send(`${failure.user} (Bounty Failure)`);
                    }else{
                        message.channel.send(`${failure.user}`);
                    }
                }).catch(err => {
                    console.log(err);
                });
                fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));
            }else{
                player.ObjCleared = false;
            }
        });
        if(!anyfails){message.channel.send("No humans failed the objective tonight!")}


        
        fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));
    }
}