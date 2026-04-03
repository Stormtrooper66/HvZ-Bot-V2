module.exports = {
    name:'countObj',
    description:'when someone post in the Objectives channel, this will see if they posted a picture',
    execute(message, args, savedData){
        //message.channel.send("You sent something");
        if(message.attachments.size == 1){
            //message.channel.send("You sent an attachment");
            if (message.attachments.every(this.attachIsImage)){
                //message.channel.send("Image Detected");
                //get senders's data
                var senderData;
                savedData.Player_Tracking.forEach(player => {
                    if(player.ID === message.author.id){
                        senderData = player;
                    }
                });
                if(senderData == undefined){message.reply("Error 404: Player not found. Make sure you have run !joingame, then post your picture again."); return;}
                //if(senderData == undefined ){console.log(senderData); return;}
                if(senderData.Status != "Human"){return;}

                senderData.ObjCleared = true;
                message.react('✅');//✔️✅
                //message.reactions.cache.find(reac => reac.emoji.id == '✅').remove();
                //message.reactions.removeAll();
                //message.react('❌');

                const fs = require('fs');
                fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));

            }else{
                message.reply("File type not recognised. Contact our Staff if this is an error."); 
                message.react('❌');
                return;
            }
        }else if(message.attachments.size > 1){
            message.reply("Multiple Attachments detected. Please submit one picture at a time."); 
            message.react('❌');
            return;
        }
    },
    attachIsImage(msgAttach) {
        var url = msgAttach.url;
        //console.log(msgAttach.url);
        //True if this url is a png image.
        var jpgcheck = (url.indexOf("jpg") !== -1) || (url.indexOf("JPG") !== -1);
        var pngcheck = url.indexOf("png") !== -1;
        var PNGcheck = url.indexOf("PNG") !== -1;
        var jpegcheck = url.indexOf("jpeg") !== -1;
        var heiccheck = url.indexOf("HEIC") !== -1;
        return (jpgcheck || pngcheck || PNGcheck || jpegcheck || heiccheck);
    }
}