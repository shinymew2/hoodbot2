const Discord = require("discord.js");

module.exports = {
    name: 'queue',
    parameter: '',
    description: "Command to see the queue",
    aliases: ['q'],
    execute(message, arguments, distube) {
        const queue = distube.getQueue(message);
        if (queue === undefined) return message.reply('The queue is empty, play something!');
        const queueEmbed = new Discord.MessageEmbed()
            .setTitle(':knot: Queue')
            .setColor('#E02401');
        for (let i = 0; i < (queue.songs.length > 5 ? 5 : queue.songs.length); i++) {
            queueEmbed.addField(
                `:musical_note: ${((queue.songs)[i].name)}`,
                `Length: ${(queue.songs)[i].formattedDuration} - [YouTube-Link](${(queue.songs)[i].url})`
            )
        }
        if (queue.songs.length > 5) queueEmbed.setFooter(`And ${(queue.songs.length - 5)} more song(s)!`);
        message.channel.send({embeds: [queueEmbed]});
    }
}