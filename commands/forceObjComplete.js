module.exports = {
    name:'forceobjcomplete',
    description:'changes the status of a players objective completion: mostly for fixing bot mistakes',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        if(!message.member.roles.cache.find(r => (r.name === "HvZ Head" || r.name === "Staff"))) return; //admin/staff only command
        if(args.length != 2) {message.reply("Incorrect number of arguments\nCommand Format: !forceobjcomplete @playername true/false"); return;}//makes sure the command is used properly

        
        //grab target's data
        var parsedId = 0;
        if(args[0].length > 18)
        {
            parsed1 = args[0].substring(2,18);
            parsed2 = args[0].substring(18,args[0].length-1);
            parsedId = parsed1+parsed2;
        }else{parsedId = args[0].substring(2,args[0].length-1);}
        try{
            const target = message.guild.members.cache.find(mem => mem.id === parsedId);
            const targetData = savedData.Player_Tracking.find(player => player.ID === target.user.id);
            //update target's status
            if(args[1] === "true" || args[1] === "True")
            {
                targetData.ObjCleared = true;
            }
            else if(args[1] === "false" || args[1] === "False"){
                targetData.ObjCleared = false;
            }

            //success notification
            if(targetData.ObjCleared){
                message.channel.send(`${target.user} has been marked as having cleared the objective.`);
            }else{
                message.channel.send(`${target.user} has been marked as not having cleared the objective.\nThey will have to complete it still or be infected at midnight.`);
            }
            

            const fs = require('fs');
            fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));
        }catch(err){
            console.log("Force Obj Complete: Something Broke, probably a player not found");
            console.log(err);
            message.reply("Incorrect usage\nCommand Format: !forceobjcomplete @playername true/false");
            return;
        }
    }
}