const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'commands',
    parameter: '',
    description: "Command to see all available commands",
    execute(message) {
        const commandsEmbed = new Discord.MessageEmbed()
            .setTitle('**Available Commands** :nerd:')
            .setColor(`#FFB085`)
            .setImage(`http://www.onlinecmag.com/wp-content/uploads/2016/09/how-to-create-the-matrix-rain-in-command-prompt.jpg`)
            .setFooter(`Be on the lookout for new commands!`);
        fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js')).sort().forEach(file => {
            const jsFile = require(`../commands/${file}`);
            commandsEmbed.addField(
                require(`../config.json`).prefix + jsFile.name + ' ' + jsFile.parameter,
                jsFile.description
            )
        });
        message.channel.send({embeds: [commandsEmbed]});
    }
}