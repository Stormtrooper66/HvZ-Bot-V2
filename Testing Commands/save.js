const { randomInt } = require('crypto');

module.exports = {
    name:'save',
    description:'test reading and writing to a json file',
    execute(message, args, savedData){
        if(message.channel.id == '1005940428899627045')//only works in certain channels
        {
            if(args != null && args[0] == "newfeed"){
                const playerDiscord = message.author.username;
                const playerID = message.author.id;
                const feedCode = randomInt(9999);
                const status = "Admin";
                
                if(savedData.Player_Tracking[0].ID != 0 && savedData.Player_Tracking[0].feedCode == -1)
                {
                    savedData.Player_Tracking[0].feedCode = feedCode;

                    message.reply("New Feed Code: "+feedCode);
                }else{
                    savedData.Player_Tracking[0].ID = playerID;
                    savedData.Player_Tracking[0].Username = playerDiscord;
                    savedData.Player_Tracking[0].FeedCode = feedCode;
                    savedData.Player_Tracking[0].Status = status;

                    message.author.createDM()
                        .then(user => (user.send("Feed Code: "+feedCode)));
                }
            }
            const fs = require('fs');
            savedData.PlayerCounts.Humans = savedData.PlayerCounts.Humans + 1;
            fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));
        }

    }
}