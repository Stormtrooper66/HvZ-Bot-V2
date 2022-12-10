const { randomInt } = require('crypto');

module.exports = {
    name:'hvzisfun',
    description:'bit of an easter egg',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        
        var num = randomInt(4);

        if(num == 0){message.channel.send("*(in a Logan sounding voice)* yeah yeah it is");}
        else if(num == 1){message.channel.send("Correct")}
        else{message.channel.send("Yep")}

    }
}