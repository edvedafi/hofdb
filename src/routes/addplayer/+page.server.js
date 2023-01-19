import firestore from '../../utils/firestore';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import _ from 'lodash';

export async function load({ url }) {
	const teams = [];

	const querySnapshot = await getDocs(collection(firestore, 'team'));
	querySnapshot?.forEach((doc) => {
		teams.push({ id: doc.id, ...doc.data() });
	});

	const data = {
		teams: _.sortBy(teams, ['location', 'team'])
	};

	console.log(`url`, url.searchParams);
	try {
		const playerID = url?.searchParams?.get('player');
		console.log('Looking for: ', playerID);
		if (playerID) {
			const docSnapshot = await getDoc(doc(firestore, 'players', playerID));
			if (docSnapshot.exists()) {
				data.player = docSnapshot.data();
			}
			console.log('data:', docSnapshot.data());
		} else {
			console.log('no url params');
		}
	} catch (e) {
		console.log(e);
	}
	console.log(data.player);

	return data;
}
