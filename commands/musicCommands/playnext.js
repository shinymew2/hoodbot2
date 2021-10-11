module.exports = {
    name: 'playnext',
    parameter: '<value>',
    description: "Command to add the next song despite possible queued up songs",
    aliases: ['pn'],
    async execute(message, arguments, distube) {
        if (distube.getQueue(message) === undefined) return message.reply(`There is nothing in the upcoming queue, please use the **${require(`./play`).name}**-command! :rolling_eyes:`);
        await distube.play(message, arguments.join(' '), {unshift: true});
        return message.channel.send(`Next song is going to be **${(distube.getQueue(message).songs)[1].name}** :nerd:`);
    }
}