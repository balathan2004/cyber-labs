import { firestore } from "@/config";
import { getDoc, doc } from "firebase/firestore";

export default async function (req, res) {
  const playlist_id = JSON.parse(req.body).course_id;
  const docRef = doc(firestore, "playlist", playlist_id);
  const docFile = await getDoc(docRef);
  const docData = docFile.data();

  res.json({ message: docData });
}
