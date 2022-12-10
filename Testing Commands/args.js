module.exports = {
    name:'args',
    description:'testing out passing in arguments',
    execute(message, args, savedData){
        message.channel.send("Arg!");
        if(args.length != 2){message.reply("Insufficient Arguments"); return;}

        if(args[0] == "test")
        {
            message.channel.send("Its a Test!");
        }
        if(args[1] >= 0 && args[1] < 15){
            message.channel.send("Low Number");
        }else if(args[1] >= 15){
            message.channel.send("High Number");
        }
    }
}