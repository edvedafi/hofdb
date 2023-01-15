<script>
	import TeamSelectField from '../../components/teamSelectField.svelte';
	export let data;

	let currentTeam;
	let currentYear = '';

	const matchYear = (check) =>
		!currentYear || (currentYear >= check.startYear && currentYear <= check.endYear);

	let currentPlayers;
	$: {
		currentPlayers = [];
		if (currentTeam) {
			data.players.forEach((player) => {
				const team = player.teams.find(
					(teamCheck) =>
						teamCheck.team === currentTeam.id &&
						(!currentYear ||
							(currentYear >= teamCheck.startYear && currentYear <= teamCheck.endYear))
				);
				if (team) {
					currentPlayers.push(
						`${player.firstName} ${player.lastName} ${team.startYear} - ${team.endYear}`
					);
				}
			});
		}
	}
</script>

<h1>Look Up Hall of Famers</h1>

<p>
	Team: <TeamSelectField bind:teams={data.teams} bind:selected={currentTeam} />
</p>
<p>
	Year: <input bind:value={currentYear} />
</p>

<div>
	{#each currentPlayers as player}
		<p>{player}</p>
	{/each}
</div>

<hr />
<!--{JSON.stringify(data.players)}-->
<!--{JSON.stringify(currentPlayers)}-->
<!--{JSON.stringify(currentYear)}-->
