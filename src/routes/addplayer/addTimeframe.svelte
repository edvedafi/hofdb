<script>
	import TeamSelectField from '../../components/teamSelectField.svelte';
	import _ from 'lodash';
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

	const processYear = (team, start, end, limitToTeamYears) => {
		if (limitToTeamYears) {
			start = _.max([start, team.startYear]);
			if (end) {
				console.log(`Setting end year to min of ${end} and  ${team.endYear}`);
				end = _.min([end, team.endYear]);
				console.log(`Choose ${end}`);
			} else {
				end = start;
			}
		}
		if (start >= team.startYear) {
			if (!end) {
				onSave(team, start, start, role);
			} else if (end <= (team.endYear || 2020)) {
				onSave(team, start, end, role);
			} else {
				teamList = `${teamList}\n${team.location} ${team.team} (${start} - ${end})`;
				alert(
					`End Year of ${end} is after the end year of ${team.location} ${team.team} in ${team.endYear}`
				);
			}
		} else {
			teamList = `${teamList}\n${team.location} ${team.team} (${start} - ${end})`;
			alert(
				`Start Year of ${start} is before the starting year of ${team.location} ${team.team} in ${team.startYear}`
			);
		}
	};

	const processYears = (team, year, limitToTeamYears) => {
		console.log('    processing year : ', year);
		if (year.indexOf(',') > 0) {
			console.log('    year still has a ,');
			const years = year.split(',');
			years.forEach((y) => processYears(team, y, limitToTeamYears));
			console.log('    finished recursion for ,');
		} else if (year.indexOf('; ') > 0) {
			console.log('    year  has a ;(space)');
			const years = year.split('; ');
			years.forEach((y) => processYears(team, y, limitToTeamYears));
			console.log('    finished recursion for ;(space)');
		} else if (year.indexOf(';') > 0) {
			console.log('    year  has a ;');
			const years = year.split(';');
			years.forEach((y) => processYears(team, y, limitToTeamYears));
			console.log('    finished recursion for ;');
		} else {
			console.log('got to a good year', year);
			const [start, end] = year.split('–');
			processYear(team, start, end, limitToTeamYears);
		}
	};

	const processTeam = (teamString, yearString, limitToTeamYears) => {
		console.log(`  Searching for team ID: ${teamString?.replace(/\s/g, '')}`);
		const team = data.teams.find((team) => team.id === teamString?.replace(/\s/g, ''));
		if (team) {
			const years = yearString.split(', ');
			console.log('  processing year string: ', yearString);
			years.forEach((year) => processYears(team, year, limitToTeamYears));
		} else {
			//don't error on the last record
			if (teamString) {
				alert(`Could not find a team named ${teamString}`);
				teamList = `${teamList}\n${teamString} (${yearString})`;
			}
		}
	};

	const processText = () => {
		if (teamList) {
			teamList = teamList.replace(/\[\d\]/g, '');
			const timeframes = teamList.split(')');
			teamList = '';
			timeframes.forEach((timeframe) => {
				const tfsplit = timeframe.trim().split('(');
				console.log('processing: ', tfsplit);
				const teamString = tfsplit[0].trim();
				console.log('  testing teamString: ', teamString);
				if (teamString.indexOf('/') > 0) {
					const nameIndex = teamString.lastIndexOf(' ');
					const teamName = teamString.slice(nameIndex);
					const teams = teamString.substring(0, nameIndex).split('/');
					teams.forEach((teamLocation) =>
						processTeam(`${teamLocation}${teamName}`, tfsplit[1], true)
					);
				} else {
					processTeam(tfsplit[0], tfsplit[1]);
				}
			});
		}
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
