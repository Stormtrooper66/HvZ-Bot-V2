module.exports = {
    name:'active',
    description:'checks if HvZ is active (game has been started)',
    execute(message, args, savedData){
        if(!savedData.gameRunning) {message.reply("No HvZ Game Running")}
        else{message.reply("HvZ Game is Running")}
    }
}