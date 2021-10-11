module.exports = {
    name: 'skip',
    parameter: '',
    description: "Command to skip the current song",
    execute(message, arguments, distube) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('You have to be in a voice channel to pause the music!');
        if (!distube.getQueue(message)) return message.reply('Nothing there to skip!');
        console.log(distube.getQueue(message).length > 1);
        if (distube.getQueue(message).songs.length > 1) {
            distube.skip(message);
        } else {
            distube.stop(message);
            return message.channel.send('No more songs to play, leaving the channel! :wave:');
        }
        return message.channel.send(':next_track: Skipped the current song!');
    }
}