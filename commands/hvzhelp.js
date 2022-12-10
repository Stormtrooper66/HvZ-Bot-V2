module.exports = {
    name:'hvzhelp',
    description:'Sends a list of all bot commands available',
    execute(message, args, savedData){
        message.channel.send(`!active  :  Checks wether or not an HvZ Game has been started
!hvzhelp  :  Sends a list of all bot commands available`);
        
        if(savedData.gameRunning) {
        message.channel.send(
        `--------------------\nIngame Only Commands\n--------------------
!joinGame : lets you join the game of HvZ!
!headCount : Shows the current number of Humans and Zombies
!tag @player XXXX : Infects a player if the correct name and feedcode are entered
!killCount @player : Shows how many tags a player has entered
!bountyList : Lists all players currently on the bounty list`);}
        
        if(message.member.roles.cache.find(r => (r.name === "HvZ Head" || r.name === "Staff"))) {//admin/staff only command
        message.channel.send(
        `--------------------\nAdmin Only Commands\n--------------------`);
        if(savedData.gameRunning){
            message.channel.send(
        `!endGame - deletes roles and disables HvZ commands
!forceJoin @player - forces a server member into the game and DMs both the player and admin the feedcode
!getFeedCode @player - retrieves the player’s feedcode and DMs it to the admin
!oz @player - makes an player an original zombie.
!randomOZ X - creates X original zombies from the current list of human players
!infect @player - turns player into a zombie because of objective failure
!revive @player - returns a player to the human role.
!verifyHeadCount - recalculates the head count from the database and makes sure it matches.
!verifyRoles - checks all roles and re-adds them based on their status in the database
!verify (headCount, Roles) - Shorthand to run both verifyRoles and verifyHeadCount. You can also run it without any arguments and it will verify both the headcount and the roles
!addBounty - adds a player to the bounty list
!objcompleted - says whether or not a player has completed the objective yet
!forceobjcomplete - changes the status of a players objective completion: mostly for fixing bot mistakes
!midnightObj - checks if players have completed the objective and automatically infects
!noCount  - removes a player from the list of people who have cleared the objective and DM’s the player that their picture did not meet the requirements`
        )}
        else
        {
            message.channel.send(`!startGame - initializes the bot, creates roles and enables other HvZ commands`);
        };
    }
    }
}