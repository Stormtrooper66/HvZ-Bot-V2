module.exports = {
    name:'getfeedcode',
    description:'retrieves the player’s feedcode and DMs it to the admin',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        if(!message.member.roles.cache.find(r => (r.name === "HvZ Head" || r.name === "Staff"))) return; //admin/staff only command
        if(args.length != 1) {message.reply("Incorrect number of arguments\nCommand Format: !getFeedCode @playername"); return;}

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
        }catch{message.reply("Incorrect usage\nCommand Format: !getFeedCode @playername"); return;}

        message.author.createDM().then(user => (user.send("Feed Code for Player: "+`${target.user}: **${targetData.FeedCode}**`)));
    }
}