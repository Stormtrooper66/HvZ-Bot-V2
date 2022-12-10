module.exports = {
    name:'endgame',
    description:'deletes roles and disables HvZ commands',
    execute(message, args, savedData){
        if(!message.member.roles.cache.find(r => r.name === "HvZ Head")) return;
        if(!savedData.gameRunning) {message.reply("No Game Running"); console.log("No Game Running"); return;}

        message.channel.send("Ending Game....");
        console.log("Ending Game....");

        //Delete Zombie Role
        let zombierole = message.guild.roles.cache.find(r => r.name === "Zombie");
        message.guild.roles.delete(zombierole).then(() => {
            console.log("Zombie Role Deleted");
        }).catch(console.error);

        //Delete Human Role
        let humanrole = message.guild.roles.cache.find(r => r.name === "Human");
        message.guild.roles.delete(humanrole).then(() => {
            console.log("Human Role Deleted");
        }).catch(console.error);

        //Delete Human Role
        let bountyrole = message.guild.roles.cache.find(r => r.name === "Bounty");
        message.guild.roles.delete(bountyrole).then(() => {
            console.log("Bounty Role Deleted");
        }).catch(console.error);

        message.channel.send("Roles Deleted");
        console.log("Roles Deleted");
        //Resets the Player Counters

        savedData.PlayerCounts.Humans = 0;
        savedData.PlayerCounts.Zombies = 0;
        savedData.PlayerCounts.Total = 0;

        message.channel.send("Player Counters Cleared\n");
        console.log("Player Counters Cleared");
        
        //Reset Player Database
        savedData.Player_Tracking = [];

        message.channel.send("Player Data Cleared");
        console.log("Player Data Cleared");

        //Disables all other game commands
        savedData.gameRunning = false;

        message.channel.send("Bot Commands Disabled");
        console.log("Bot Commands Disabled");

        const fs = require('fs');
        fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));

        

        message.channel.send("--------------------\n\nThank you for participating in Humans vs Zombies!\n\nA few notes now that the game is over:\n-All human/zombie roles have been removed\n-HvZ related commands will no longer work\n-Next time you join a game of HvZ, you will have a different feed code\n\nWe hope you had a great time, and we look forward to seeing you next time!");
    }
}