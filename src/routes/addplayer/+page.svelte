<script>
	import { doc, setDoc } from 'firebase/firestore';
	import db from '../../utils/firestore';
	import AddTimeframe from './addTimeframe.svelte';
	import Modal from '../../components/Modal.svelte';
	import { modal } from '../../stores/Modal.store.js';
	export let data;
	let firstName = '';
	let lastName = '';
	let teams = [];

	const resetPlayer = () => {
		firstName = '';
		lastName = '';
		teams = [];
		resetTimeframe();
	};

	let newTeam;
	let newStart;
	let newEnd;

	const resetTimeframe = () => {
		newTeam = undefined;
		newStart = undefined;
		newEnd = undefined;
	};

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
		resetTimeframe();
	}

	$: player = {
		firstName: firstName,
		lastName: lastName,
		teams: teams
	};

	async function save() {
		console.log(`Creating document: ${firstName}${lastName}`, player);
		await setDoc(doc(db, 'players', `${firstName}${lastName}`), player);
		resetPlayer();
	}
</script>

<Modal show={$modal}>
	<h1>Add Player</h1>
	<div>
		<label for="firstName">First name:</label>
		<input id="firstName" autocomplete="off" bind:value={firstName} />
	</div>
	<div>
		<label for="lastName">Last name:</label>
		<input id="lastName" autocomplete="off" bind:value={lastName} />
	</div>

	<h2>Add Played For Timeframe</h2>

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
</Modal>
