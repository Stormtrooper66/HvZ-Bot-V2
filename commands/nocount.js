const countObj = require('./countObj');

module.exports = {
    name:'nocount',
    description:'removes a player from the list of people who have cleared the objective and DM’s the player that their picture did not meet the requirement',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        if(!message.member.roles.cache.find(r => (r.name === "HvZ Head" || r.name === "Staff"))) return; //admin/staff only command
        if(args.length != 1) {message.reply("Incorrect number of arguments\nCommand Format: !nocount @playername"); return;}//makes sure the command is used properly
        
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
        }catch{message.reply("Incorrect usage\nCommand Format: !nocount @playername"); return;}

        //admins can't be fail an objective
        if(targetData.Status === "Admin") {message.reply(`${target.user} is a game Admin, they cannot fail an objective.`); return;}

        //zombies also cannot fail an objective
        if(targetData.Status === "Zombie") {message.reply(`${target.user} is already a zombie, they cannot fail an objective.`); return;}

        targetData.ObjCleared = false;

        target.createDM().then(user => (user.send("You're last picture posted in **#objectives** was not counted for objective completion.\nYou'll need to post a new picture to not be infected at 12:00AM\n\nIf you have any questions about this decision, ask about it in **#contact-the-staff**")));

        //✅ so this is long and disgusting looking, but it gets all channels, finds just the objectives channel, then gets all messages, then finds the one from the target with the bot being the first reaction on it. AKA is only counts ones with a checked picture from before.
        //Then it grabs only the first one, to use for removing the green tick and adding the red one
        message.guild.channels.fetch()
        .then(allchannels => {
        const objchannel = allchannels.filter(ch => ch.id == 958755910744956948 || ch.id == 900130926846148608).first();
        
        objchannel.messages.fetch()
        .then(messages => {
            const latest = messages.filter(m => m.attachments.size == 1 && m.author.id == target.id && m.reactions.cache.size != 0 && m.reactions.cache.first().users.cache.first().bot).first();
            latest.reactions.removeAll();
            latest.react('❌');
            
        })
        .catch(console.error);

        }).catch(console.error);

        const fs = require('fs');
        fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));
    }
}