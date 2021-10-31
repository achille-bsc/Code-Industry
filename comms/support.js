const { MessageEmbed } = require('discord.js');
const commandeFormat = 'support';


module.exports.check = (args) => {
	return commandeFormat.split(' ')[0] == args[0];
};

/**
     *
     * @param {Discord.Message} msg
     */

module.exports.action = async (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
		// executer le code
		msg.delete();
		const exampleEmbed = new MessageEmbed()
			.setColor('#4ed5f8')
			.setTitle('Serveur support')
			.setURL('https://discord.gg/yG3PuG8qXe');
		msg.channel.send({ embeds: [exampleEmbed] });
	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};