module.exports = {
    name:'bountylist',
    description:' lists all players on the bounty list',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;


        var bountyfound = false;
        savedData.Player_Tracking.forEach(player => {
            if(player.hasBounty){
                
                if(!bountyfound){message.channel.send("There are Bounties on");}
                bountyfound = true;
                message.guild.members.fetch(player.ID).then(tar => {
                    message.channel.send(`${tar.user}`);
                }).catch(err => {
                    console.log(err);
                });
            }
        });
        if(!bountyfound){message.channel.send("No Humans have a bounty")}
    }
}