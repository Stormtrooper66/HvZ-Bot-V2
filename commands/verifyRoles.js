module.exports = {
    name:'verifyroles',
    description:'goes through all the users and makes sure they have the correct roles',
    execute(message, args, savedData){
        if(!savedData.gameRunning) return;
        if(!message.member.roles.cache.find(r => (r.name === "HvZ Head" || r.name === "Staff"))) return; //admin/staff only command

        
        savedData.Player_Tracking.forEach(player => {
            
            message.guild.members.fetch(player.ID).then(mem => {

                let humanrole = message.guild.roles.cache.find(r => r.name === "Human");
                let zombierole = message.guild.roles.cache.find(r => r.name === "Zombie");
                let bountyrole = message.guild.roles.cache.find(r => r.name === "Bounty");

                if(player.Status === "Human"){
                    mem.roles.remove(zombierole);
                    mem.roles.add(humanrole);
                    //console.log("Checking Human Roles");
                }else if(player.Status === "Zombie"){
                    mem.roles.add(zombierole);
                    mem.roles.remove(humanrole);
                    //console.log("Checking Zombie Roles");
                }
                if(player.hasBounty){
                    mem.roles.add(bountyrole);
                }else{
                    mem.roles.remove(bountyrole);
                }
                //console.log(mem);
                //console.log(`${mem.user} has been randomly Infected as an Origional Zombie!\nRun for your lives!`);
                //console.log(`Roles verified for ${mem.id}\n`);
            }).catch(err => {
                console.log(err);
            });


        });
        message.channel.send("All user roles have been verified");
    }
}