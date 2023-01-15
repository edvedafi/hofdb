<script>
	import Dialog from '../components/addTeamModal.svelte';

	import { getContext } from 'svelte';

	export let selected;
	export let teams;

	const onCancel = () => {
		selected = null;
	}

	const onOkay = async (newTeam) => {
		teams = [...teams, newTeam];
		selected = newTeam;
	}

	const showDialog = () => {
		if ( selected === 'AddTeam' ) {
			open(
				Dialog,
				{
					onCancel,
					onOkay
				},
				{
					closeButton: false,
					closeOnEsc: true,
					closeOnOuterClick: true,
				}
			);
		}
	};

	const { open } = getContext('simple-modal');
</script>

<select bind:value={selected} on:change={showDialog}>
	<option value={null}>
	</option>
	{#each teams as team}
		<option value={team}>
			{team.location}
			{team.team}
		</option>
	{/each}
	<option value={"AddTeam"} >
		+ Add Team
	</option>
</select>
