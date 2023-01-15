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
	$: newTeam = {
		id: `${teamLocation}${teamName}`,
		team: teamName,
		location: teamLocation
	};

	function _onCancel() {
		onCancel();
		close();
	}

	async function _onOkay() {
		await setDoc(doc(db, 'team', newTeam.id), newTeam);
		onOkay(newTeam);
		close();
	}

</script>

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

<h2>New Team</h2>

<label for='location'>Location</label>
<input
	id='location'
	type="text"
	bind:value={teamLocation}
	on:keydown={e => e.which === 13 && _onOkay()} />
<br/>
<label for='name'>Team Name</label>
<input
	id='name'
	type="text"
	bind:value={teamName}
	on:keydown={e => e.which === 13 && _onOkay()} />
<br/>

<div class="buttons">
	<button on:click={_onCancel}>
		Cancel
	</button>
	<button on:click={_onOkay}>
		Okay
	</button>
</div>
