import firestore from '../../utils/firestore';
import { collection, getDocs } from 'firebase/firestore';
import leagueStore from '../../stores/leagueStore';
import { onDestroy } from 'svelte';

export async function load() {
	const data = {
		teams: [],
		leagues: []
	};

	const teamSnapshot = await getDocs(collection(firestore, 'team'));
	teamSnapshot?.forEach((doc) => {
		const team = {
			id: doc.id,
			...doc.data()
		};
		if (!team.league) {
			team.edit = true;
		}
		data.teams.push(team);
	});

	const leagues = leagueStore();
	await leagues.get();
	const unsubscribe = leagues.data.subscribe((leagueData) => {
		data.leagues = leagueData.leagues;
	});
	// onDestroy(unsubscribe);

	return data;
}
