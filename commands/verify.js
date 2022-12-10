const verifyHeadCount = require("./verifyHeadCount");
const verifyRoles = require("./verifyRoles");

module.exports = {
    name:'verify',
    description:'Shorthand to run both verifyRoles and verifyHeadCount',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        if(!message.member.roles.cache.find(r => (r.name === "HvZ Head" || r.name === "Staff"))) return; //admin/staff only command

        if(args[0] == null){
            verifyHeadCount.execute(message, args, savedData);
            verifyRoles.execute(message, args, savedData);
        }else if(args[0] === "headCount"){
            verifyHeadCount.execute(message, args, savedData);
        }else if(args[0] === "roles"){
            verifyRoles.execute(message, args, savedData);
        }else{
            message.reply("Incorrect Command Usage. (Case sensitive)\n!verify (headCount/roles)");
        }

    }
}