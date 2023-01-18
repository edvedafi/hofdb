<script>
	import { doc, setDoc } from 'firebase/firestore';
	import db from '../../utils/firestore';
	import {getKey} from '../../utils/firebase';
	import Modal from '../../components/Modal.svelte';
	import { modal } from '../../stores/Modal.store.js';
	import ManageTimeFrame from './manageTimeFrames.svelte';

	export let data;
	let firstName = '';
	let lastName = '';
	let focusAfterSave;

	const resetPlayer = () => {
		firstName = '';
		lastName = '';
		player.teams = []
		focusAfterSave.focus();
	};

	$: player = {
		firstName: firstName,
		lastName: lastName,
		teams: player?.teams || []
	};

	$: id = getKey(firstName + lastName)

	const pasteFirstName = (e)=> {
		// Get pasted data via clipboard API
		const clipboardData = e.clipboardData || window.clipboardData;
		const pastedData = clipboardData.getData('Text');
		e.stopPropagation();
		e.preventDefault();

		[firstName, lastName] = pastedData.split(' ');
	}

	async function save() {
		console.log(`Creating document: ${id}`, player);
		try {
			await setDoc(doc(db, 'players', id), player);
			resetPlayer();
		} catch (e) {
			console.log(e);
			alert(e.message)
		}
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

	<ManageTimeFrame bind:data={data} bind:teams={player.teams} />

	<p>
		<button on:click={save}>Save {id}</button>
	</p>
</Modal>
