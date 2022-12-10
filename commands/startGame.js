module.exports = {
    name:'startgame',
    description:'Creates the neccesarry roles and initializes the Saved_Data',
    execute(message, args, savedData){
        if(!message.member.roles.cache.find(r => r.name === "HvZ Head")) return;
        if(savedData.gameRunning) {message.reply("Game Already Started"); console.log("Game Already Started"); return;}

        message.channel.send("Starting Game....");
        console.log("Starting Game....");

        //Create Bounty Role
        let bountyrole = message.guild.roles.cache.find(r => r.name === "Bounty");
        if(bountyrole == undefined){
            message.guild.roles.create().then(role => {
                role.setName("Bounty");
                role.setColor("Purple");
                role.setHoist(true);
            });
            bountyrole = message.guild.roles.cache.find(r => r.name === "Bounty");
        }
        message.channel.send("Bounty Role Ready");
        console.log("Bounty Role Ready");

        //Create Zombie Role
        let zombierole = message.guild.roles.cache.find(r => r.name === "Zombie");
        if(zombierole == undefined){
            message.guild.roles.create().then(role => {
                role.setName("Zombie");
                role.setColor("DarkGreen");
                role.setHoist(true);
            });
            zombierole = message.guild.roles.cache.find(r => r.name === "Zombie");
        }
        message.channel.send("Zombie Role Ready");
        console.log("Zombie Role Ready");

        //Create Human Role
        let humanrole = message.guild.roles.cache.find(r => r.name === "Human");
        if(humanrole == undefined){
            message.guild.roles.create().then(role => {
                role.setName("Human");
                role.setColor("Red");
                role.setHoist(true);
            });
            humanrole = message.guild.roles.cache.find(r => r.name === "Human");
        }
        message.channel.send("Human Role Ready");
        console.log("Human Role Ready");

        //Resets the Player Counters

        savedData.PlayerCounts.Humans = 0;
        savedData.PlayerCounts.Zombies = 0;
        savedData.PlayerCounts.Total = 0;

        message.channel.send("Player Counters Initialized");
        console.log("Player Counters Initialized\n");

        //Activates all other game commands
        savedData.gameRunning = true;

        message.channel.send("Bot Commands Enabled");
        console.log("Bot Commands Enabled\n");

        const fs = require('fs');
        fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));

        
        message.channel.send("--------------------\n\nHumans vs Zombies is now open for signups!\n\nTo get in on the action, use the !joingame command in the #hvz-bot-commands channel and wait for HvZ Bot to give you further instructions.\n\nKeep an eye out for announcements regarding official starting dates and mission times.");
    }
}