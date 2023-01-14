import firestore from '../../utils/firestore'
import { collection, getDocs } from "firebase/firestore";

export async function load() {

	const teams = [];

	const querySnapshot = await getDocs(collection(firestore, "team"));
	if ( querySnapshot ){
		console.log('Snapshot:', querySnapshot)
		querySnapshot.forEach((doc) => {
			console.log(`${doc.id} => `, doc.data());
			teams.push(doc.data())
		});
	}

	return {teams};
}
