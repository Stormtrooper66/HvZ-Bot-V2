require(`dotenv`).config();
const { REST, Routes} = require('discord.js');

const commands = [
    {
        name: 'online',
        description: 'Replies if the bot is running, so you don\' have to use !active',
    },
    {
        name: 'help',
        description: 'Lists out all commands available to players',
    },
    {
        name: 'version',
        description: 'Replies with the Bot\'s version number',
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try{
        console.log(`Registering slash commands...`)
        
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID, 
                process.env.GUILD_ID
            ),
            {
                body: commands
            }
        );

        console.log(`Slash Commands Registered`)
    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
})();