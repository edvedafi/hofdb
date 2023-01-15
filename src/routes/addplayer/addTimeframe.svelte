<script>
	export let selected;
	export let data;
	export let startYear;
	export let endYear;
	let invalid;
	$: invalid = !(
		selected &&
		startYear &&
		startYear > 1900 &&
		startYear < 2050 &&
		endYear &&
		endYear > 1900 &&
		endYear < 2050
	);
	const startFourDigit = () =>{
		startYear = (startYear && startYear > 9 && startYear < 100 ? 1900 + startYear : startYear);
	}
	const endFourDigit = () => endYear = (endYear && endYear > 9 && endYear < 100 ? 1900 + endYear : endYear);
</script>

<select bind:value={selected}>
	{#each data.teams as team}
		<option value={team}>
			{team.location}
			{team.team}
		</option>
	{/each}
</select>

<input bind:value={startYear} type="number" on:blur={startFourDigit}/> - <input bind:value={endYear} type="number" on:blur={endFourDigit}/>

<button on:click disabled={invalid}>
	Add Team
</button>
