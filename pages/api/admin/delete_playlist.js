import { firestore } from "@/config";
import { deleteDoc, doc } from "firebase/firestore";
export default async function (req, res) {
  const { course_id } = JSON.parse(req.body);
  try {
    const docRef = doc(firestore, "playlist", course_id);
    await deleteDoc(docRef);
    res.json({ message: "doc deleted successfully" });
  } catch (err) {
    res.json({ message: "doc not deleted " });
  }
}
