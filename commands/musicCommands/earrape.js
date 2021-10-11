module.exports = {
    name: 'earrape',
    parameter: '<on | off>',
    description: "Command to change the tone of the music :smirk:",
    async execute(message, arguments, distube) {
        const queue = distube.getQueue(message);
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('You have to be in a voice channel to play music!');
        if (!queue) return message.reply('Nothing is playing!');
        if (arguments.length === 0) return message.reply('Please specifiy if the filter should be turned on or off!');
        if (arguments[0] === 'on') {
            if (queue.filters.length === 1) return message.channel.send('Nah mate that\'s enough :point_right::grinning::point_left:');
            await distube.setVolume(queue, 200);
            await distube.setFilter(queue, 'bassboost');
            return message.channel.send('Prepare for trouble :point_right::grinning::point_left:');
        }
        if (arguments[0] === 'off') {
            if (queue.filters.length === 0) return message.channel.send('Everything is (still) normal! :eyes:');
            await distube.setVolume(queue, 50);
            await distube.setFilter(queue, false);
            return message.channel.send('Thank god it\'s over :face_exhaling:');
        }
    }
}