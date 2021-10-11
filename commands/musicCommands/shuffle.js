module.exports = {
    name: 'shuffle',
    parameter: '',
    description: "Command to shuffle the queue!",
    execute(message, arguments, distube) {
        const voiceChannel = message.member.voice.channel;
        const queue = distube.getQueue(message);
        if (!voiceChannel) return message.reply('You have to be in a voice channel to shuffle songs!');
        if (!queue) return message.channel.send('Nothing there to shuffle!');
        distube.shuffle(queue);
        return message.channel.send('Queue was shuffled! :face_in_clouds:')
    }
}