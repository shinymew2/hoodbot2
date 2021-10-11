module.exports = {
    name: 'delete',
    parameter: '<value>',
    description: 'Command used to delete past messages',
    async execute(message, arguments) {
        if(!(message.member.permissions.has('MANAGE_MESSAGES') || message.member.roles.cache.find(role => role.name === 'Mod'))) {
            return message.reply('Insufficient permission!');
        }
        if((isNaN(arguments[0]) && arguments[0] !== 'max') || (!isNaN(arguments[0]) && arguments[0] < 1)) {
            return message.reply('Please specify a natural number or type \'max\'!');
        }
        await message.channel.messages.fetch(isNaN(arguments[0]) ? 100 : {limit: +arguments[0] + 1}).then(messages => {
            message.channel.bulkDelete(messages);
        });
        await message.channel.send('Deleted ' + (isNaN(arguments[0]) ? 'maximum amount of' : arguments[0]) + (!isNaN(arguments[0]) && arguments[0] < 2 ? ' message!' : ' messages!'));
    }
}