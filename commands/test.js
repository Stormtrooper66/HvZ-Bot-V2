module.exports = {
    name:'test',
    description:'deletes a role',
    execute(message, args, savedData){
        //Delete zach
        if(!message.member.roles.cache.find(r => (r.name === "Aaron"))) return; //admin/staff only command
        let zachrole = message.guild.roles.cache.find(r => r.name === "Zach");
        message.guild.roles.delete(zachrole).then(() => {
            console.log("Deleted Zach role");
        }).catch(console.error);

        let aaronrole = message.guild.roles.cache.find(r => r.name === "Aaron");
        message.guild.roles.delete(aaronrole).then(() => {
            console.log("Deleted Aaron role");
        }).catch(console.error);

        let jonrole = message.guild.roles.cache.find(r => r.name === "jon");
        message.guild.roles.delete(jonrole).then(() => {
            console.log("Deleted jon role");
        }).catch(console.error);
    }
}