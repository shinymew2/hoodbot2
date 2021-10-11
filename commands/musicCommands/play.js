module.exports = {
    name: 'play',
    parameter: '<value>',
    description: "Command to play music",
    aliases: ['p'],
    async execute(message, arguments, distube) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('You have to be in a voice channel to play music!');
        if (arguments.length === 0) return message.reply('You have to specify a song!');
        await distube.play(message, arguments.join(' '));
    }
}