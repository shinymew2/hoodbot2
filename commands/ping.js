module.exports = {
    name: 'ping',
    parameter: '',
    description: "Command to ping the bot",
    execute(message) {
        message.channel.send(`Pong! - ${Date.now() - message.createdTimestamp}ms`)
    }
}