module.exports = {
    name: 'resume',
    parameter: '',
    description: "Command to resume the music",
    execute(message, arguments, distube) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('You have to be in a voice channel to pause the music!');
        if (!distube.getQueue(message)) return message.reply('Nothing there to resume!');
        if (distube.getQueue(message).paused) {
            distube.resume(message);
            return message.channel.send(':play_pause: Resumed the music!');
        } else {
            return message.reply(`Already resumed the music!`);
        }
    }
}