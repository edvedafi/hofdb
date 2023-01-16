<script>
	import TeamSelectField from '../../components/teamSelectField.svelte';
	let selected;
	let focusAfterSave;
	export let role = 'player';
	export let data;
	let startYear;
	let endYear;
	export let onSave = () => {};
	let teamList;
	let teamOutput = '';

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
	const startFourDigit = () => {
		startYear = startYear && startYear > 9 && startYear < 100 ? 1900 + startYear : startYear;
	};
	const endFourDigit = () =>
		(endYear = endYear && endYear > 9 && endYear < 100 ? 1900 + endYear : endYear);

	const _onSave = () => {
		onSave(selected, startYear, endYear, role);
		selected = undefined;
		startYear = undefined;
		endYear = undefined;
		teamList = '';
		focusAfterSave.focus();
	};

	const processText = () => {
		if (teamList) {
			const timeframes = teamList.split(')');
			timeframes.forEach((timeframe) => {
				const tfsplit = timeframe.split('(');
				const team = data.teams.find((team) => team.id === tfsplit[0]?.replace(/\s/g, ''));
				if (team) {
					const years = tfsplit[1].split(', ');
					years.forEach((year) => {
						const [start, end] = year.split('–');
						if (start >= team.startYear) {
							if (!end) {
								onSave(team, start, start, role);
							} else if (end <= (team.endYear || 2020)) {
								onSave(team, start, end, role);
							} else {
								alert(
									`End Year of ${end} is after the end year of ${tfsplit[0]} in ${team.endYear}`
								);
							}
						} else {
							alert(
								`Start Year of ${start} is before the starting year of ${tfsplit[0]} in ${team.startYear}`
							);
						}
					});
				} else {
					//don't error on the last record
					if (tfsplit[0]) {
						alert(`Could not find a team named ${tfsplit[0]}`);
					}
				}
			});
		}
		teamList = '';
	};
</script>

<TeamSelectField bind:inputForFocus={focusAfterSave} bind:teams={data.teams} bind:selected />

<input
	bind:value={startYear}
	type="number"
	autocomplete="off"
	on:blur={startFourDigit}
	on:keydown={(e) => e.which === 13 && _onSave()}
	placeholder={oldestValid}
/>
-
<input
	bind:value={endYear}
	type="number"
	autocomplete="off"
	on:blur={endFourDigit}
	on:keydown={(e) => e.which === 13 && _onSave()}
	placeholder={newestValid}
/>

<select bind:value={role}>
	<option value={'player'}>Player</option>
	<option value={'manager'}>Manager/Coach</option>
	<option value={'assistant'}>Assistant</option>
	<option value={'gm'}>GM</option>
	<option value={'exec'}>Exec</option>
	<option value={'umpire'}>Umpire</option>
</select>

<button on:click={_onSave} disabled={invalid}> Add Timeframe </button>

<p>
	<textarea bind:value={teamList} />
	<button on:click={processText}> Add Timeframes </button>
</p>

<p>{teamOutput}</p>
