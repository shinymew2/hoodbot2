const fs = require('fs');

module.exports = {
    name: 'aliases',
    parameter: '<value>',
    description: "Command to see available aliases for a specified command",
    execute(message, arguments) {
        if (arguments.length === 0) return message.reply('Please specifiy a command so I can look for aliases!')
        fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js')).forEach(file => {
            const jsFile = require(`../commands/${file}`);
            if (jsFile.name === arguments[0]) {
                if (jsFile.aliases !== undefined) {
                    return message.channel.send(`The available aliases for the ***${jsFile.name}***-command are:\n`
                    + '```' + `${jsFile.aliases.join(', ')}` + '```');
                } else return message.channel.send(`No aliases for this command available!`);
            }
        });
        fs.readdirSync(`./commands/musicCommands/`).filter(file => file.endsWith('.js')).forEach(file => {
            const jsFile = require(`../commands/musicCommands/${file}`);
            if (jsFile.name === arguments[0]) {
                if (jsFile.aliases !== undefined) {
                    return message.channel.send(`The available aliases for the ***${jsFile.name}***-command are:\n`
                    + '```' + `${jsFile.aliases.join(', ')}` + '```');
                } else return message.channel.send(`No aliases for this command available!`);
            }
        });
    }
}