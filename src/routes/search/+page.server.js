import firestore from '../../utils/firestore';
import { collection, getDocs } from 'firebase/firestore';
import _ from 'lodash';

export async function load() {
	const teams = [];
	const players = [];

	const querySnapshot = await getDocs(collection(firestore, 'team'));
	querySnapshot.forEach((doc) => {
		teams.push({ id: doc.id, ...doc.data() });
	});

	const playerQuery = await getDocs(collection(firestore, 'players'));
	playerQuery.forEach((doc) => {
		console.log(JSON.stringify(doc.data()));
		players.push({ id: doc.id, ...doc.data() });
	});

	return {
		teams: _.sortBy(teams, ['location', 'team']),
		players: _.sortBy(players, ['startYear', 'endYear', 'lastName', 'firstName'])
	};
}
