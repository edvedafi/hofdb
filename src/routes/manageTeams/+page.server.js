import firestore from '../../utils/firestore';
import { collection, getDocs } from 'firebase/firestore';

export async function load() {
	const data = {
		teams: [],
		leagues: []
	}

	const teamSnapshot = await getDocs(collection(firestore, 'team'));
	teamSnapshot?.forEach((doc) => {
		const team = {
			id: doc.id,
			...doc.data()
		};
		if ( !team.league ) {
			team.edit = true;
		}
		data.teams.push(team);
	});

	const leagueSnapshot = await getDocs(collection(firestore, 'league'));
	leagueSnapshot?.forEach((doc) => {
		data.leagues.push({ id: doc.id, ...doc.data() });
	});

	return data;
}
