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
                //if(senderData == undefined ){console.log(senderData); return;}
                if(senderData.Status != "Human"){return;}

                senderData.ObjCleared = true;
                message.react('✅');//✔️✅
                //message.reactions.cache.find(reac => reac.emoji.id == '✅').remove();
                //message.reactions.removeAll();
                //message.react('❌');

                const fs = require('fs');
                fs.writeFileSync('./Saved_Data.json', JSON.stringify(savedData));

            }else{return;}
        }
    },
    attachIsImage(msgAttach) {
        var url = msgAttach.url;
        //True if this url is a png image.
        var jpglcheck = url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
        var pngcheck = url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
        var jpegcheck = url.indexOf("jpeg", url.length - "jpeg".length /*or 4*/) !== -1;
        return (jpglcheck || pngcheck || jpegcheck);
    }
}