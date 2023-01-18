<script>
	import { getContext } from 'svelte';
	import { doc, setDoc } from 'firebase/firestore';
	import db from '../utils/firestore';
	export let onCancel = () => {};
	export let onOkay = () => {};

	const { close } = getContext('simple-modal');

	let teamLocation;
	let teamName;
	let newTeam;
	let startYear;
	let endYear;
	$: {
		newTeam = {
			id: `${teamLocation}${teamName}`?.replace(/\s/g, ''),
			team: teamName,
			location: teamLocation,
			startYear: startYear
		};
		if (endYear) {
			newTeam.endYear = endYear;
		}
	}

	function _onCancel() {
		onCancel();
		close();
	}

	async function _onOkay() {
		if ( newTeam ) {
			await setDoc(doc(db, 'team', newTeam.id), newTeam);
			onOkay(newTeam);
			close();
		}
	}
</script>

<h2>New Team</h2>

<label for="location">Location</label>
<input
	id="location"
	type="text"
	bind:value={teamLocation}
	on:keydown={(e) => e.which === 13 && _onOkay()}
/>
<br />
<label for="name">Team Name</label>
<input
	id="name"
	type="text"
	bind:value={teamName}
	on:keydown={(e) => e.which === 13 && _onOkay()}
/>
<br />
<label for="startYear">Start Year</label>
<input
	id="startYear"
	type="text"
	bind:value={startYear}
	on:keydown={(e) => e.which === 13 && _onOkay()}
/>
<br />
<label for="endYear">End Year</label>
<input
	id="endYear"
	type="text"
	bind:value={endYear}
	on:keydown={(e) => e.which === 13 && _onOkay()}
/>
<br />

<div class="buttons">
	<button on:click={_onCancel}> Cancel </button>
	<button on:click={_onOkay}> Okay </button>
</div>

<style>
	h2 {
		font-size: 2rem;
		text-align: center;
	}

	input {
		width: 100%;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
	}
</style>
