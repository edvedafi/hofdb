<script>
	import AddTimeframe from './addTimeframe.svelte';
	import _ from 'lodash';

	export let data;
	export let teams;
	let role;
	$: {
		if (_.isEmpty(teams)) {
			role = 'player';
		}
	}

	let editableTeam;
	let editableStartYear;
	let editableEndYear;

	function addTeam(newTeam, newStart, newEnd, role) {
		if (newTeam) {
			teams.push({
				team: newTeam.id,
				displayTeam: `${newTeam.location} ${newTeam.team}`,
				startYear: newStart,
				endYear: newEnd || newStart,
				role: role
			});

			teams = _.sortBy(teams, ['startYear', 'endYear']);
		}
	}

	const editTeam = (timeframe, rowNum) => {
		editableTeam = data.teams.find((team) => timeframe.team === team.id);
		editableStartYear = timeframe.startYear;
		editableEndYear = timeframe.endYear;
		role = timeframe.role;
		teams = _.sortBy(
			_.filter(teams, (team, i) => i !== rowNum),
			['startYear', 'endYear']
		);
	};
</script>

<h2>Add Played For Timeframe</h2>

{#each teams as team, i}
	<p>
		{team.displayTeam}{#if team.role !== 'player'}({team.role}){/if}
		{team.startYear}
		{#if team.endYear !== team.startYear}- {team.endYear} {/if}
		<button on:click={() => editTeam(team, i)}>Edit</button>
	</p>
{/each}

<AddTimeframe
	{data}
	bind:role
	selected={editableTeam}
	startYear={editableStartYear}
	endYear={editableEndYear}
	onSave={addTeam}
/>
