const Discord = require('discord.js');
const fs = require(`fs`);

module.exports = {
    name: 'music',
    parameter: '',
    description: "Command to see all music commands",
    execute(message) {
        const musicEmbed = new Discord.MessageEmbed()
        .setTitle('**Available Music-Commands** :notes:')
        .setColor(`#FFB085`)
        .setImage(`https://www.kingartmusic.se/files/slide_1.jpg`)
        .setFooter(`Partytime :)`);
        fs.readdirSync(`./commands/musicCommands/`).filter(file => file.endsWith('.js')).sort().forEach(file => {
            const jsFile = require(`../commands/musicCommands/${file}`);
            musicEmbed.addField(
                require(`../config.json`).prefix + jsFile.name + ' ' + jsFile.parameter,
                jsFile.description
            )
        });
        message.channel.send({embeds: [musicEmbed]});
    }
}