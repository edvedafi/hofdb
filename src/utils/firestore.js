import firebaseApp  from "./firebase";
import { getFirestore } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

export default firestore;
