import { firestore } from "@/config";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";

export default async function (req, res) {
  try {
    const { course_id, video_id } = JSON.parse(req.body);
    console.log(course_id, video_id);

    const docName = `${course_id}@${video_id}`;

    const docRef = doc(firestore, "comments", docName);

    const commentDoc = await getDoc(docRef);
    const commentData = commentDoc.data().comment;

    res.json({ commentData: commentData, status: 200 });
  } catch (e) {
    console.log("error", e);
    res.json({ error: e.message });
  }
}
