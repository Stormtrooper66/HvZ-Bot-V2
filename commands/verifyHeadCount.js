module.exports = {
    name:'verifyheadcount',
    description:'shows the number of humans and zombies',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        if(!message.member.roles.cache.find(r => (r.name === "HvZ Head" || r.name === "Staff"))) return; //admin/staff only command

        var humans = 0;
        var zombies = 0;

        savedData.Player_Tracking.forEach(player => {
            if(player.Status === "Human"){
                humans++;
                //console.log("Human found");
            }else if(player.Status === "Zombie"){
                zombies++;
                //console.log("Zombie found");
            }
        });

        if(savedData.PlayerCounts.Humans != humans) savedData.PlayerCounts.Humans = humans;
        if(savedData.PlayerCounts.Zombies != zombies) savedData.PlayerCounts.Zombies = zombies;
        if(savedData.PlayerCounts.Total != (humans + zombies)) savedData.PlayerCounts.Total = (humans + zombies);

        const fs = require('fs');
        fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));

        message.channel.send(`Head Count has been verified\n\nHumans:${savedData.PlayerCounts.Humans}\nZombies:${savedData.PlayerCounts.Zombies}`);
    }
}