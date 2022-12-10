module.exports = {
    name:'killcount',
    description:' shows how many tags a player has entered',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        if(args.length != 1) {message.reply("Incorrect usage\nCommand Format: !killCount @playername"); return;}//makes sure the command is used properly

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
        }catch{message.reply("Incorrect usage\nCommand Format: !killCount @playername"); return;}

        message.channel.send(`${target.user} has ${targetData.KillCount} kill(s)!`);
        
    }
}