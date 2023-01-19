<script>
	import LeagueSelect from './leagueSelectField.svelte';
	import { doc, setDoc } from 'firebase/firestore';
	import db from '../../utils/firestore';
	export let data;
	let teamList = data.teams
	let leagueFilter = '';

	$: teamList = leagueFilter ? data.teams.filter(team => team.edit || team.league === leagueFilter) : data.teams

	const onSave = async (team) => {
		const newTeam = {
			team: team.team,
			location: team.location,
			startYear: team.startYear,
			league: team.league
		};

		if (team.team) {
			newTeam.team = team.team;
		}
		if (team.endYear) {
			newTeam.endYear = team.endYear;
		}

		console.log(`Creating document: ${team.id}`, newTeam);
		try {
			await setDoc(doc(db, 'team', team.id), newTeam);
			console.log('saved!');
			team.edit = false;
			teamList = teamList;
		} catch (e) {
			console.log(e);
			alert(`Failed to save ${team.id}`);
		}
	};

	const getLeague = (leagueId) => {
		// console.log('looking for league: ', leagueId);
		return data.leagues.find((league) => league.id === leagueId)?.abr;
	};
</script>

<h1>Manage Teams</h1>

<div>
	<LeagueSelect bind:selected={leagueFilter} leagues={data.leagues} label />
</div>

<div>
	{#each teamList as team, i}
		<p>
			{#if team.edit }
				<input autoComplete="off" bind:value={team.location} />
				<input autoComplete="off" bind:value={team.team} />
				<LeagueSelect
					leagues={data.leagues}
					bind:selected={team.league}
				/>
				<input autoComplete="off" bind:value={team.startYear} />
				<input autoComplete="off" bind:value={team.endYear} />
				<button on:click={() => (onSave(team))}>Save</button>
			{:else}
				{team.location}
				{team.team} ({getLeague(team.league)}) {team.startYear} -
				{#if team.endYear}{team.endYear}{:else}Present{/if}
				<button on:click={() => (team.edit = true)}>Edit</button>
			{/if}
		</p>
	{/each}
</div>
