import { writable } from 'svelte/store';
import { collection, getDocs } from 'firebase/firestore';
import firestore from '../utils/firestore';

export default function () {
	const loading = writable(false);
	const error = writable(false);
	const data = writable({ leagues: [] });

	async function get() {
		loading.set(true);
		error.set(false);
		try {
			const leagueSnapshot = await getDocs(collection(firestore, 'league'));
			data.set({leagues: leagueSnapshot.docs.map(doc=>({id: doc.id, ...doc.data() }))})
		} catch (e) {
			error.set(e);
		}
		loading.set(false);
	}

	get();

	return {data, loading, error, get};
}
