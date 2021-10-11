const Discord = require('discord.js')

module.exports = {
    name: 'nowplaying',
    parameter: '',
    description: "Command to see the song that is playing",
    aliases: ['np'],
    execute (message, arguments, distube) {
        const queue = distube.getQueue(message);
        if (queue) {
            const npEmbed = new Discord.MessageEmbed()
                .setTitle(`Now playing\n:notes: **${(queue.songs)[0].name}** :notes:`)
                .setColor('#AB6D23')
                .addFields(
                    {
                        name: `\u200B`,
                        value: `:clock2: Length: **${(queue.songs)[0].formattedDuration}**`,
                        inline: true
                    },
                    {
                        name: `\u200B`,
                        value: `:computer: [YouTube-Link](${(queue.songs)[0].url})`,
                        inline: true
                    },
                    {
                        name: `\u200B`,
                        value: (queue.songs)[1] === undefined ? `:x: Nothing queued up` : `:interrobang: Queued up next: *${(queue.songs)[1].name}*`
                    }
                )
                .setThumbnail((queue.songs)[0].thumbnail);
            message.channel.send({embeds: [npEmbed]});
        } else return message.reply('No song playing!');
    }
}