const fs = require('fs')
const {Client, GatewayIntentBits, Collection, DiscordAPIError } = require('discord.js')
const Discord = require('discord.js');

const dotenv = require('dotenv')
dotenv.config()
const token = process.env.TOKEN
const prefix = process.env.PREFIX

const version = "2.5.5";

const client = new Client({
    partials: [
      "CHANNEL",
    ],
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildScheduledEvents,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.DirectMessageTyping,
      GatewayIntentBits.DirectMessageReactions,
    ]
  });

//command execution files
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const runcommand = require(`./commands/${file}`);

  client.commands.set(runcommand.name, runcommand);
}

// slash command execution files
client.slash_commands = new Discord.Collection();
const slashcommandFiles = fs.readdirSync('./slash_commands/').filter(file => file.endsWith('.js'));
for(const file of slashcommandFiles){
  const runslashcommand = require(`./slash_commands/${file}`);

  client.slash_commands.set(runslashcommand.name, runslashcommand);
}

const savedData = require('./Saved_Data.json');
savedData.botVersion = version;

client.on('ready', () => {
    console.log(`Logged in as: ${client.user.tag}\nBot Online!\n\nVersion ${version}`);
    
    client.user.setPresence({
      activities: [{ name: 'HvZ!' }],
      status: 'online',
    });  
})

//Chat based commands aka using !
client.on('messageCreate', (message) => {
  if(message.author.bot) return;

  //objective checking
  if(message.channel.name == "objectives" || message.channel.name == "Objectives" || message.channel.name == "objective" || message.channel.name == "Objective"){
    const args = message.content.slice(prefix.length).split(/ +/);
    try{
      client.commands.get("countObj").execute(message,args,savedData);
    }catch(error){
      return message.reply(
        {embeds: [{
          description: `Something broke. try again or notify an admin if this issue persists.`,
          color: 	16776960 //yellow
          }], 
          ephemeral:true  
        }
      );
    }
    return;
  }
  //command checking
  if(!message.content.startsWith(prefix)) return;
  
  const args = message.content.slice(prefix.length).split(/ +/);
  const runcommand = args.shift().toLowerCase();

  try{
    if(client.commands.get(runcommand)){
      client.commands.get(runcommand).execute(message,args,savedData);
    }
  }catch (error){
    console.log(`Error on Command input.\n\n${error.toString()}\n`);
    return message.reply(
      {embeds: [{
        description: `There was an error. Try again or contact an admin if this issue persists.`,
        color: 	16776960 //yellow
        }], 
        ephemeral:true  
      }
    );
  }
  
})


//Slash based commands, aka auto-completable ones
client.on('interactionCreate', (interaction) => {

  if (!interaction.isChatInputCommand()) return;

  const args = 0//message.content.slice(prefix.length).split(/ +/);
  const slashcommand = interaction.commandName.toString();

  try{
    if(client.slash_commands.get(slashcommand)){
      client.slash_commands.get(slashcommand).execute(interaction,args,savedData);
    }else{
      return interaction.reply(
        {embeds: [{
          description: `\"${slashcommand}\" not found. Contact an admin if this issue persists.`,
          color: 	16776960 //yellow
          }], 
          ephemeral:true  
        }
      );
    }
  }catch (error){
    return interaction.reply(
      {embeds: [{
        description: `\"${slashcommand}\" not run. Contact an admin if this issue persists.`,
        color: 	16776960 //yellow
        }], 
        ephemeral:true  
      }
    );
  }
  
})

client.login(token)