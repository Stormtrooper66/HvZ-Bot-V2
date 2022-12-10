module.exports = {
    name:'howscrewedarewe',
    description:'bit of an easter egg',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        
        const zombies = savedData.PlayerCounts.Zombies;
        const total = savedData.PlayerCounts.Total;
        const ratio = zombies / total;

        if(ratio == 0){message.channel.send("You're all humans...")}
        else if(ratio < 0.25){message.channel.send("You're doing just fine, not too many have turned yet")}
        else if(ratio < 0.5){message.channel.send("You're still ok, but nearly half of you are zombies")}
        else if(ratio < 0.75){message.channel.send("Yeah you're in trouble, over half of you are zombies")}
        else if(ratio < 1){message.channel.send("Better watch out, nearly all of you are zombies")}
        else if(ratio == 1){message.channel.send("You're all zombies. As it should be")}
        else{message.channel.send("Not enough players yet.")}2
    }
}