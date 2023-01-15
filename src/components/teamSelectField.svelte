<script>
	export let selected;
	export let teams;
</script>

<select bind:value={selected}>
	{#each teams as team}
		<option value={team}>
			{team.location}
			{team.team}
		</option>
	{/each}
</select>
