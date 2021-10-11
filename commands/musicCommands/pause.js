module.exports = {
    name: 'pause',
    parameter: '',
    description: "Command to pause the music",
    execute(message, arguments, distube) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('You have to be in a voice channel to pause the music!');
        if (!distube.getQueue(message)) return message.reply('Nothing there to pause!');
        if (distube.getQueue(message).playing) {
            distube.pause(message);
            return message.channel.send(':pause_button: Paused the music!');
        } else {
            return message.reply(`Already paused the music!`);
        }
    }
}