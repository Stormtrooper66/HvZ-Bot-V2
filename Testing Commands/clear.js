module.exports = {
    name:"clear",
    description:"Clears a bunch of messages",
    async execute(message, args, savedData){
        if(message.channel.id != '637038303874383875') return;//only works in certain channels
        if(!args[0]) return message.reply("Enter how many messaged to clear");
        if(isNaN(args[0])) return message.reply("Enter a real number");

        if(args[0] > 5) return message.reply("You can't clear more than 5 messages at a time");
        if(args[0] < 1) return message.reply("Enter a number of at least 1");

        await message.channel.messages.fetch({Limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }
}