
module.exports = {
    name:'scoreboard',
    description:'shows the top 5 zombie killers',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        //if(args.length != 1) {message.reply("Incorrect usage\nCommand Format: !scoreboard @playername"); return;}//makes sure the command is used properly

        //find top 5 zombie killers
        var highestkills = 0;
        var highestkilluser;
        var leaders = [];
        var highestkillprevious = 10000000000;

        for(let boardpos = 1; boardpos <= 5; boardpos++) {

            savedData.Player_Tracking.forEach(player => {
                if(player.KillCount > highestkills && player.KillCount <= highestkillprevious ){
                    var skip = false;
                    leaders.forEach(leaderplayer => {
                        if(leaderplayer == player){skip = true; return;}
                    });//make sure it doesn't pull the same name twice
                    
                    if(!skip){
                    highestkills = player.KillCount;
                    highestkilluser = player;
                    }
                }
            });
            
            if(leaders[boardpos-1] != highestkilluser && (leaders[boardpos-1] != undefined || boardpos == 1)){
                leaders[boardpos] = highestkilluser;
                highestkillprevious = highestkilluser.KillCount;
                highestkills = 0;
            }
        };

        message.channel.send(`Zombie Kill Leader Board`);
        this.board(message,leaders);
    },
    
    async board(message,leaders){

        var timeouttime = 250; //in milliseconds, 1000 is one second
        //time.sleep(1);
        if(leaders[1] != undefined){
            await message.guild.members.fetch(leaders[1].ID).then(tar => {
                message.channel.send(`1st: ${tar.user} with ${leaders[1].KillCount} kill(s)`);
                setTimeout(() => {
                    if(leaders[2] != undefined){
                        message.guild.members.fetch(leaders[2].ID).then(tar => {
                            message.channel.send(`2nd: ${tar.user} with ${leaders[2].KillCount} kill(s)`);
                            setTimeout(() => {
                            if(leaders[3] != undefined){
                                message.guild.members.fetch(leaders[3].ID).then(tar => {
                                    message.channel.send(`3rd: ${tar.user} with ${leaders[3].KillCount} kill(s)`);
                                    setTimeout(() => {
                                    if(leaders[4] != undefined){
                                        message.guild.members.fetch(leaders[4].ID).then(tar => {
                                            message.channel.send(`4th: ${tar.user} with ${leaders[4].KillCount} kill(s)`);
                                            setTimeout(() => {
                                            if(leaders[5] != undefined){
                                                message.guild.members.fetch(leaders[5].ID).then(tar => {
                                                    message.channel.send(`5th: ${tar.user} with ${leaders[5].KillCount} kill(s)`);
                                                }).catch(err => {
                                                    console.log(err);
                                                });
                                                }
                                            }, timeouttime)
    
                                        }).catch(err => {
                                            console.log(err);
                                        });
                                        }
                                    }, timeouttime)
    
                                }).catch(err => {
                                    console.log(err);
                                });
                                }
                            }, timeouttime)
    
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                }, timeouttime)
                
            }).catch(err => {
                console.log(err);
            });
        }

        //I'm sorry future me
        //its just that nasty to force it to go in order :(

        //console.log(leaders.length);
        /*leaders.forEach(players => {
            message.guild.members.fetch(players.ID).then(tar => {
                message.channel.send(`${tar.user} with ${players.KillCount} kill(s)`);
            }).catch(err => {
                console.log(err);
            });
        });*/

        
    }
}