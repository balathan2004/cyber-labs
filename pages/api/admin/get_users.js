import { firestore } from "@/config";
import { collection, getDocs } from "firebase/firestore";

export default async function (req, res) {
  // cookies check

  const collectionRef = collection(firestore, "users");

  const documents = await getDocs(collectionRef);

  const docData = documents.docs.map((docFile) => docFile.data());
  res.json({ message: docData, authType: 200 });
}
