module.exports = {
    name:'adminping',
    description:'tests out admin only commands',
    execute(message, args, savedData){
        if(message.member.roles.cache.has('1005970775918002268')) //get this value from the role itself
        message.channel.send("Pog pong!");
    }
}