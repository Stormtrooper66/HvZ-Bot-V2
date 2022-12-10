module.exports = {
    name:'ping',
    description:'its like hello world',
    execute(message, args, savedData){
        message.channel.send("pong!");
    }
}