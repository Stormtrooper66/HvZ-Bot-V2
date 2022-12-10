module.exports = {
    name:'headcount',
    description:'shows the number of humans and zombies',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;

        message.channel.send(`Humans:${savedData.PlayerCounts.Humans}\nZombies:${savedData.PlayerCounts.Zombies}`);
    }
}