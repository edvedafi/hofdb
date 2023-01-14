<script>
	export let data;

	let currentTeam;

	function selectTeam(team) {
		currentTeam = team;
	}
</script>

<h1>Look Up Hall of Famers</h1>

<div>
	<h2>By Team</h2>

	{#if currentTeam}
		<p>Selected team: {currentTeam.location} {currentTeam.team}</p>
		<button on:click={()=>selectTeam()}>Clear</button>
	{:else}
		{#each data.teams as team}
			<p>
				<button on:click={()=>selectTeam(team)}>
					{team.location}
					{team.team}
				</button>
			</p>
		{/each}
	{/if}
</div>
