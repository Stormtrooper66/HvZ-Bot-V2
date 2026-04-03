const { SystemChannelFlagsBitField } = require("discord.js");

module.exports = {
    name:'create',
    description:'its like hello world',
    execute(message, args, savedData){
    
        if(args[0] == null) return message.reply("You need to specify a role");
        
        let zombierole = message.guild.roles.cache.find(r => r.name === "Zombie");
        if(zombierole == undefined){
            message.guild.roles.create().then(role => (role.setName("Zombie").then(role.setColor("DarkGreen"))));
            zombierole = message.guild.roles.cache.find(r => r.name === "Zombie");
        }
        console.log(zombierole);
        message.member.roles.add(zombierole).catch(console.error);

        message.reply("You now have the Zombie Role");
    }
}

//!!Cannot create a role and add a role to a user in the same run!!