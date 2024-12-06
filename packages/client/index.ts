import { Events, SlashCommandBuilder } from 'discord.js'
import { client } from './client';

const BOT_TOKEN = import.meta.env.DISCORD_BOT_TOKEN;

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);

	const ping = new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies "pong"!');

	const getRoles = new SlashCommandBuilder()
		.setName('getroles')
		.setDescription('Get role the user in the Discord server')

	client.application?.commands.create(ping, import.meta.env.DISCORD_SERVER_ID);
	client.application?.commands.create(getRoles, import.meta.env.DISCORD_SERVER_ID);

});


client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		interaction.reply("pong");
	}

	if (interaction.commandName === 'getroles') {		
		const userId = interaction.user.id;
		const member = await interaction.guild?.members.fetch(userId);
		const memberRoles = member?.roles.cache.map(role => ({
      id: role.id,
      name: role.name,
      position: role.position,
      permissions: role.permissions.toArray()
    }));

		const serverRoles = interaction.guild?.roles.cache.map(role => ({
      id: role.id,
      name: role.name,
      position: role.position,
      permissions: role.permissions.toArray()
    }));

		console.log('member roles:', memberRoles);
		console.log('server roles:', serverRoles);

		interaction.reply("role fetched in console");
	}
})

client.login(BOT_TOKEN);
