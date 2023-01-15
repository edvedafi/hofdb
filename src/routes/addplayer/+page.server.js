import firestore from '../../utils/firestore';
import { collection, getDocs } from 'firebase/firestore';
import _ from 'lodash';

export async function load() {
	const teams = [];

	const querySnapshot = await getDocs(collection(firestore, 'team'));
	querySnapshot?.forEach((doc) => {
		teams.push({ id: doc.id, ...doc.data() });
	});

	return { teams: _.sortBy(teams, ['location', 'team']) };
}
