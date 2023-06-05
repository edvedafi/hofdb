<script>
	import LeagueSelect from './leagueSelectField.svelte';
	import { doc, setDoc } from 'firebase/firestore';
	import db from '../../utils/firestore';
	import {getKey} from '../../utils/firebase'
	export let data;
	let teamList = data.teams
	let leagueFilter = '';
	let focusAfterPaste;
	let focusAfterSave;

	$: teamList = leagueFilter ? data.teams.filter(team => team.edit || team.league === leagueFilter) : data.teams

	const blankTeam = () => ({
		team: undefined,
		location: undefined,
		startYear: undefined,
		endYear: undefined,
		league: leagueFilter,
	});
	let newTeam = blankTeam();
	$: {
		newTeam.league = leagueFilter;
	}

	const saveNew = () => (onSave(newTeam));
	const onSave = async (team) => {
		const teamUpdate = {
			location: team.location,
			startYear: team.startYear,
			league: team.league || leagueFilter
		};

		if (team.team) {
			teamUpdate.team = team.team;
		}
		if (team.endYear) {
			teamUpdate.endYear = team.endYear;
		}

		const teamId = team.id || getKey(`${team.location}${team.team}`)

		console.log(`Creating document: ${teamId}`, teamUpdate);
		try {
			await setDoc(doc(db, 'team', teamId), teamUpdate);
			console.log('saved!');
			team.edit = false;
			if (!team.id ) {
				teamList.push(teamUpdate)
				data.teams.push(teamUpdate)
				data.teams = data.teams;
				newTeam = blankTeam();
				focusAfterSave.focus();
			}
			//silly svelte hack
			teamList = teamList;
		} catch (e) {
			console.log(e);
			alert(`Failed to save ${teamId}`);
		}
	};

	const getLeague = (leagueId) => {
		// console.log('looking for league: ', leagueId);
		return data.leagues.find((league) => league.id === leagueId)?.abr;
	};

	const pasteTeam = (e)=> {
		// Get pasted data via clipboard API
		const clipboardData = e.clipboardData || window.clipboardData;
		const pastedData = clipboardData.getData('Text');
		e.stopPropagation();
		e.preventDefault();

		[newTeam.location, newTeam.team] = pastedData.split(' ');
		focusAfterPaste.focus();
	}
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

	<label for='newLocation'>Location</label>
	<input id='newLocation' bind:this={focusAfterSave} tabindex="0" autoComplete="off" bind:value={newTeam.location} on:paste={pasteTeam}/>
	<label for='newTeam'>Team Name</label>
	<input id='newTeam' tabindex="1" autoComplete="off" bind:value={newTeam.team} />
	<LeagueSelect
		leagues={data.leagues}
		bind:selected={newTeam.league}
	/>
	<label for='startYear'>Start Year</label>
	<input id='startYear' tabindex="2" autoComplete="off" bind:this={focusAfterPaste} bind:value={newTeam.startYear} on:keydown={(e) => e.which === 13 && saveNew()}/>

	<label for='endYear'>End Year</label>
	<input id='endYear' tabindex="3" autoComplete="off" bind:value={newTeam.endYear} on:keydown={(e) => e.which === 13 && saveNew()} />
	<button on:click={() => (onSave(newTeam))}>Save</button>
</div>
