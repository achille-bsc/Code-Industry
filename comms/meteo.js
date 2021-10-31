const weather = require('weather-js');

const commandeFormat = 'meteo';
const { MessageEmbed } = require('discord.js');

module.exports.check = (args) => {
	return (commandeFormat.split(' ')[0] == args[0]);
};

/**
     *
     * @param {Discord.Message} msg
     */

module.exports.action = async (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
		// executer le code
		if (!args.length) {
			return msg.channel.send('Please give the weather location');
		}
		weather.find({ search: args.join(' '), degreeType: 'C' }, function(err, result) {
			try {

				const embed = new MessageEmbed()
					.setTitle(`Météo - ${result[0].location.name}`)
					.setColor('#ff2050')
					.setDescription('Les unités de température peuvent différer dans le temps')
					.addField('Temperature', `${result[0].current.temperature} Celcius`, true)
					.addField('Êtat du cliel', result[0].current.skytext, true)
					.addField('Humiditée', result[0].current.humidity, true)
					.addField('Vitesse du vent', result[0].current.windspeed, true)
					.addField('Heure d\'observation', result[0].current.observationtime, true)
					.addField('Sens du vent', result[0].current.winddisplay, true)
					.setThumbnail(result[0].current.imageUrl);
				msg.channel.send(embed);
			}
			catch (err) {
				return msg.channel.send('Impossible de trouver les informations en rapport avec le lieux donné.');
			}
		});
		// LETS CHECK OUT PKG
	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};
