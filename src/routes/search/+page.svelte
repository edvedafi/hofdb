<script>
	import TeamSelectField from '../../components/teamSelectField.svelte';
	import Modal from '../../components/Modal.svelte';
	import { modal } from '../../stores/Modal.store.js';
	import _ from 'lodash';
	export let data;

	let teamList;
	$: {
		if (currentYear) {
			teamList = data.teams.filter(
				(team) => team.startYear <= currentYear && (!team.endYear || team.endYear >= currentYear)
			);
		} else {
			teamList = data.teams;
		}
	}
	let currentTeam;
	let currentYear = '';

	let currentPlayers;
	$: {
		currentPlayers = [];
		if (currentTeam) {
			data.players.forEach((player) => {
				player.teams.forEach((team) => {
					if (
						((!currentTeam && currentYear) || team.team === currentTeam.id) &&
						(!currentYear || (currentYear >= team.startYear && currentYear <= team.endYear))
					) {
						currentPlayers.push({
							firstName: player.firstName,
							lastName: player.lastName,
							start: team.startYear,
							end: team.endYear,
							role: team.role && team.role !== 'player' ? ` (${team.role})` : ''
						});
					}
				});
			});
		}
		currentPlayers = _.sortBy(currentPlayers, ['start', 'end', 'lastName', 'firstName']);
	}
</script>

<Modal show={$modal}>
	<h1>Look Up Hall of Famers</h1>

	<p>
		Team: <TeamSelectField bind:teams={teamList} bind:selected={currentTeam} />
	</p>
	<p>
		Year: <input bind:value={currentYear} />
	</p>

	<div>
		{#each currentPlayers as player}
			<p>{player.firstName} {player.lastName}{player.role} {player.start} - {player.end}</p>
		{/each}
	</div>

	<hr />
	<!--{JSON.stringify(data.players)}-->
	<!--{JSON.stringify(currentPlayers)}-->
	<!--{JSON.stringify(currentYear)}-->
</Modal>
