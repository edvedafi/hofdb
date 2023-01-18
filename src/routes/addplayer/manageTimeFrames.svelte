<script>
	import AddTimeframe from './addTimeframe.svelte';
	import _ from 'lodash';

	export let data;
	export let teams;
	let teamIndex = 0;
	let role
	$: {
		if ( _.isEmpty(teams)) {
			role = 'player';
		}
	}

	function addTeam(newTeam, newStart, newEnd, role) {
		if ( newTeam ) {
			teams.push({
				index: teamIndex++,
				team: newTeam.id,
				displayTeam: `${newTeam.location} ${newTeam.team}`,
				startYear: newStart,
				endYear: newEnd || newStart,
				role: role
			});

			teams = _.sortBy(teams, ['startYear', 'endYear']);
		}
	}
</script>

<h2>Add Played For Timeframe</h2>

{#each teams as team}
	<p>{team.displayTeam}{#if team.role !== 'player'}({team.role}){/if} {team.startYear} {#if team.endYear !== team.startYear}- {team.endYear} {/if}</p>
{/each}

<AddTimeframe {data} bind:role={role} onSave={addTeam} />
