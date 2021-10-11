module.exports = {
    name: 'playnext',
    parameter: '<value>',
    description: "Command to add the next song despite possible queued up songs",
    aliases: ['pn'],
    async execute(message, arguments, distube) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('You have to be in a voice channel to play music!');
        if (distube.getQueue(message) === undefined) return message.reply(`There is nothing in the upcoming queue, please use the **${require(`./play`).name}**-command! :rolling_eyes:`);
        await distube.play(message, arguments.join(' '), {unshift: true});
        return message.channel.send(`Next song is going to be **${(distube.getQueue(message).songs)[1].name}** :nerd:`);
    }
}