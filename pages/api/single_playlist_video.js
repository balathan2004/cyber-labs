import { firestore } from "@/config";
import { getDoc, doc } from "firebase/firestore";

export default async function (req, res) {
  const { course_id, video_id } = JSON.parse(req.body);

  const docRef = doc(firestore, "playlist", course_id);

  const docData = await getDoc(docRef);
  console.log(docData.data().videos);

  res.json({ message: "suucess" });
}
