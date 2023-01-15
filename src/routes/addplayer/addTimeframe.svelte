<script>
	import TeamSelectField from '../../components/teamSelectField.svelte'
	 let selected;
	export let data;
	 let startYear;
	 let endYear;
	export let onSave=()=>{};

	let invalid;

	let oldestValid;
	$: oldestValid = selected?.startYear || 1875;

	let newestValid;
	$: newestValid = selected?.endYear || 2020;

	$: invalid = !(
		selected &&
		startYear &&
		endYear &&
		startYear >= oldestValid &&
		startYear <= endYear &&
		endYear >= startYear &&
		endYear <= newestValid
	);
	const startFourDigit = () =>{
		startYear = (startYear && startYear > 9 && startYear < 100 ? 1900 + startYear : startYear);
	}
	const endFourDigit = () => endYear = (endYear && endYear > 9 && endYear < 100 ? 1900 + endYear : endYear);

	const _onSave = ()=>{
		onSave(selected, startYear, endYear)
		selected = undefined;
		startYear = undefined;
		endYear = undefined;
	}

</script>

<TeamSelectField bind:teams={data.teams} bind:selected={selected}/>

<input bind:value={startYear} type="number" autocomplete="off" on:blur={startFourDigit} 	on:keydown={e => e.which === 13 && _onSave()}/> -
<input bind:value={endYear} type="number" autocomplete="off" on:blur={endFourDigit} on:keydown={e => e.which === 13 && _onSave()}/>

<button on:click={_onSave} disabled={invalid}>
	Add Timeframe
</button>
