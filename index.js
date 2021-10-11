const {Client, Intents, DiscordAPIError} = require('discord.js');
const {DisTube} = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const {token, prefix} = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');
const { CachedManager } = require('discord.js');

// Constructors
const client = new Client({intents: ['GUILDS', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'DIRECT_MESSAGES']});
const distube = new DisTube(client, {updateYouTubeDL: false, plugins: [new SpotifyPlugin(), new SoundCloudPlugin()]});

// Const
client.commands = new Discord.Collection();
client.musicCommands = new Discord.Collection();
client.aliases = new Discord.Collection();

// Load all commands
for (let i = 0; i < 2; i++) {
    fs.readdirSync(i === 0 ? './commands/' : './commands/musicCommands/').filter(file => file.endsWith('.js')).forEach(file => {
        const command = require(i === 0 ? `./commands/${file}` : `./commands/musicCommands/${file}`);
        const curComCol = i === 0 ? client.commands : client.musicCommands;
        curComCol.set(command.name, command);
        if (command.aliases) command.aliases.forEach(alias => {
            client.aliases.set(alias, command);
            console.log(`Set alias '${alias}' for ${curComCol.get(command.name).name}-command`);
        })
        console.log(`Loaded '${curComCol.get(command.name).name}'-command\n`);
    });
}

// Log when bot goes online
client.once('ready', () => {
    console.log('HoodBot is online!');
});

// Handle the commands
client.on("messageCreate", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    arguments = message.content.slice(prefix.length).split(/ +/);
    command = arguments.shift();
    // Check if command was an alias
    if (client.aliases.get(command)) {
        return client.aliases.get(command).execute(message, arguments, distube);
    }
    // Check if command was a non music command
    if (client.commands.get(command)) {
        return client.commands.get(command).execute(message, arguments, distube);
    }
    // Check of command was a music command
    if (client.musicCommands.get(command)) {
        return client.musicCommands.get(command).execute(message, arguments, distube);
    }
    return message.reply('Not a valid command, type **-commands** for help!');
});

// Handle music events
distube
    .on("playSong", (queue, song) => {
        console.log(queue.songs[0].name);
        queue.textChannel.send(
            {embeds: [new Discord.MessageEmbed()
                .setTitle(`Now playing\n:notes: ${song.name} :notes:`)
                .setColor("#F78812")
                .setFooter(`Enjoy the music!`)
            ]}
        
    )})
    .on("addList", (queue, playlist) => queue.textChannel.send(
        `Added a new playlist to the queue! :partying_face:`
    ));

// Login bot
client.login(token);