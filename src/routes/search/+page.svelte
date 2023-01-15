<script>
	import TeamSelectField from '../../components/teamSelectField.svelte'
	export let data;

	let currentTeam;

</script>

<h1>Look Up Hall of Famers</h1>

<div>
	Team: <TeamSelectField bind:teams={data.teams} bind:selected={currentTeam}/>
</div>
