const Discord = require('discord.js');

module.exports = {
    name: 'gay',
    description: 'Command to see gayness :gay_pride_flag:',
    execute(message, arguments) {
        const rand = Math.floor(Math.random() * 101);
        const gayEmbed = new Discord.MessageEmbed()
            .addField(
                arguments.length === 0 ? `How gay am I?` : `How gay is ${arguments}?`,
                (arguments.length === 0 ? `I'm ` : `${arguments} is `) + `${rand}% gay :gay_pride_flag:` 
            )
        message.channel.send({embeds: [gayEmbed]});
    }
}