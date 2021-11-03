const { MessageEmbed, MessageCollector, WebhookClient, Permissions } = require('discord.js');
const commandeFormat = 'staff';
const ALIAS = [];
const COLOR = require('../color-embeds.json');

module.exports.check = (args) => {
	return (commandeFormat.split(' ')[0] == args[0] || ALIAS.includes(args[0]));
};

/**
 *
 * @param {Discord.Message} msg
 */
module.exports.action = async (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
		// executer le code
		const nperm = new MessageEmbed()
			.setTitle('Erreur')
			.setColor('RED')
			.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.');
		if (!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return msg.channel.send({ embeds: [nperm] });
		const colorC = COLOR['color-embed'][msg.guild.id]?.color || '#4ed5f8';
		msg.delete();
		console.log('001');
		const question = new MessageEmbed()
			.setTitle('Pour quelle raison voullez-vous faire appel au staff du bot ?')
			.setColor(colorC)
        ;
		console.log('002');
		const collector = await new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
		console.log('003');
		msg.channel.send({ embeds: [question] });
		console.log('004');
		collector.on('collect', async msgg => {
			if (msg.author.id === msgg.author.id) {
				const raison = msgg.content;
				msgg.delete();
				collector.stop();
				const info = new MessageEmbed()
					.setTitle('Informations')
					.setDescription(`Les informations suivantes seront partagés sur celui-ci
                    > **Le nom du serveur:** \`${msg.guild.name}\`
                    > **L'identifiant du serveur:** \`${msg.guild.id}\`
                    > **Votre pseudonyme:** \`${msg.author.username}\`
                    > **Votre tag:** \`${msg.author.tag}\`
                    > **Votre identifiant:** \`${msg.author.id}\`
                    > **La raison de votre demande d'aide:** \`${raison}\``)
					.setColor(colorC)
					.addField('Voullez-vous confirmer l\'envoit de ces infos au staff du bot ?', '`oui` ou `non`')
                ;
				const collector2 = await new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
				const infos = await msg.channel.send({ embeds: [info] });
				collector2.on('collect', async msggg => {
					if (msg.author.id === msggg.author.id) {
						if (msggg.content === 'oui') {
							infos.delete();
							msggg.delete();
							const yes = new MessageEmbed()
								.setTitle('Votre requête à été envoyée avec succès !')
								.setColor(colorC)
                            ;
							const hook = new WebhookClient({ url: 'https://discord.com/api/webhooks/905450271109427200/JWpwV-B38ZfHSYZiKDQJbzXiwkauobUsLs4tEk8u9tu8OT9I00_3gczA_wrwORfEhsr2' });
							await hook.send({ embeds: [info] });
							await msggg.channel.send({ embeds: [yes] });
						}
						else if (msggg.content === 'non') {
							infos.delete();
							msggg.delete();
							const no = new MessageEmbed()
								.setTitle('Votre requête à été annulée avec succès !')
								.setColor(colorC)
                            ;
							msggg.channel.send({ embeds: [no] });
						}
					}
				});
			}
		});


	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};