import firestore from '../../utils/firestore';
import { doc, getDoc } from 'firebase/firestore';

export async function load() {

	const docSnapshot = await getDoc(doc(firestore, "cities", "SF"));

	return docSnapshot.data();
}
