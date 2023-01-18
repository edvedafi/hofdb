<script>
	import { doc, setDoc } from 'firebase/firestore';
	import db from '../../utils/firestore';
	import AddTimeframe from './addTimeframe.svelte';
	import Modal from '../../components/Modal.svelte';
	import { modal } from '../../stores/Modal.store.js';
	import _ from 'lodash';
	export let data;
	let firstName = '';
	let lastName = '';
	let teams = [];
	let role = 'player'
	let focusAfterSave;

	const resetPlayer = () => {
		firstName = '';
		lastName = '';
		teams = [];
		role = 'player';
		focusAfterSave.focus();
	};

	function addTeam(newTeam, newStart, newEnd, role) {
		if ( newTeam ) {
			teams.push({
				team: newTeam.id,
				displayTeam: `${newTeam.location} ${newTeam.team}`,
				startYear: newStart,
				endYear: newEnd || newStart,
				role: role
			});

			teams = _.sortBy(teams, ['startYear']);
		}
	}

	let player;
	$: player = {
		firstName: firstName,
		lastName: lastName,
		teams: teams
	};

	const pasteFirstName = (e)=> {
		// Get pasted data via clipboard API
		const clipboardData = e.clipboardData || window.clipboardData;
		const pastedData = clipboardData.getData('Text');
		e.stopPropagation();
		e.preventDefault();

		[firstName, lastName] = pastedData.split(' ');
	}

	async function save() {
		console.log(`Creating document: ${firstName}${lastName}.replace(/\\s/g, '')`, player);
		await setDoc(doc(db, 'players', `${firstName}${lastName}.replace(/\\s/g, '')`), player);
		resetPlayer();
	}
</script>

<Modal show={$modal}>
	<h1>Add Player</h1>
	<div>
		<label for="firstName">First name:</label>
		<input id="firstName" autocomplete="off" bind:value={firstName} bind:this={focusAfterSave} on:paste={pasteFirstName}/>
	</div>
	<div>
		<label for="lastName">Last name:</label>
		<input id="lastName" autocomplete="off" bind:value={lastName} />
	</div>

	<h2>Add Played For Timeframe</h2>

	{#each teams as team}
		<p>{team.displayTeam}{#if team.role !== 'player'}({team.role}){/if} {team.startYear} {#if team.endYear !== team.startYear}- {team.endYear} {/if}</p>
	{/each}

	<AddTimeframe {data} bind:role={role} onSave={addTeam} />

	<p>
		<button on:click={save}>Save {firstName}{lastName}</button>
	</p>
</Modal>
