module.exports = {
    name:'whatdowewant',
    description:'bit of an easter egg',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        message.channel.send("Brains!");
    }
}