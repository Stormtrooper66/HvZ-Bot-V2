const fs = require('fs')
const {Client, GatewayIntentBits, Collection, DiscordAPIError } = require('discord.js')
const Discord = require('discord.js');

const dotenv = require('dotenv')
dotenv.config()
const token = process.env.TOKEN
const version = process.env.VERSION
const prefix = process.env.PREFIX

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


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const runcommand = require(`./commands/${file}`);

  client.commands.set(runcommand.name, runcommand);
}

const savedData = require('./Saved_Data.json');

client.on('ready', () => {
    console.log(`Logged in as: ${client.user.tag}\nBot Online!`)
})

client.on('messageCreate', (message) => {
  if(message.author.bot) return;

  //objective checking
  if(message.channel.id == 958755910744956948 || message.channel.id == 900130926846148608){
    const args = message.content.slice(prefix.length).split(/ +/);

    client.commands.get("countObj").execute(message,args,savedData);

    return;
  }
  //command checking
  if(!message.content.startsWith(prefix)) return;
  
  const args = message.content.slice(prefix.length).split(/ +/);
  const runcommand = args.shift().toLowerCase();

  if(client.commands.get(runcommand)){
    client.commands.get(runcommand).execute(message,args,savedData);
  }
  
})





client.login(token)