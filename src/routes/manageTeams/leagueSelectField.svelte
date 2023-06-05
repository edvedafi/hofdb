<script>
	export let selected = null;
	export let leagues;
	export let label = false;
</script>

{#if label}
	<label for="leagueSelect">League Filter</label>
{/if}
<select id="leagueSelect" bind:value={selected} tabindex='99' >
	<option value={undefined} />
	{#each leagues as league}
		<option value={league.id}>
			{league.abr}: {league.name}
		</option>
	{/each}
</select>
