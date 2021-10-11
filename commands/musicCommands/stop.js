module.exports = {
    name: 'stop',
    parameter: '',
    description: "Command to stop the bot from playing music",
    execute(message, arguments, distube) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('You have to be in a voice channel to stop the music!');
        if (!distube.getQueue(message)) return message.reply('Nothing is playing!');
        distube.stop(message);
        return message.channel.send('Stopped the music, *bye bye* :wave:');
    }
}