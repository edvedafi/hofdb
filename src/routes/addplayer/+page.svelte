<script>
	import { doc, setDoc } from 'firebase/firestore';
	import db from '../../utils/firestore';
	import AddTimeframe from './addTimeframe.svelte';
	export let data;
	let firstName = '';
	let lastName = '';
	let teams = [];

	let newTeam;
	let newStart;
	let newEnd;
	function addTeam() {
		teams = [
			...teams,
			{
				team: newTeam.id,
				displayTeam: `${newTeam.location} ${newTeam.team}`,
				startYear: newStart,
				endYear: newEnd
			}
		];
	}

	$: player = {
		firstName: firstName,
		lastName: lastName,
		teams: teams
	};

	async function save() {
		console.log(`Creating document: ${firstName}${lastName}`, player);
		await setDoc(doc(db, 'players', `${firstName}${lastName}`), player);
	}
</script>

<h1>Add Player</h1>
<div>
	<label for="firstName">First name:</label>
	<input id="firstName" bind:value={firstName} />
</div>
<div>
	<label for="lastName">Last name:</label>
	<input id="lastName" bind:value={lastName} />
</div>

<h2>Add Teams</h2>

{#each teams as team}
	<p>{team.displayTeam} {team.startYear} - {team.endYear}</p>
{/each}

<AddTimeframe
	{data}
	bind:startYear={newStart}
	bind:endYear={newEnd}
	bind:selected={newTeam}
	on:click={addTeam}
/>

<p>
	<button on:click={save}>Save {firstName}{lastName}</button>
</p>
