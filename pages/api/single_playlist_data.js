import { firestore } from "@/config";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";

export default async function (req, res) {
  try {
    const { course_id } = JSON.parse(req.body);

    const collectionRef = collection(firestore, "comments");

    const docRef = doc(firestore, "playlist", course_id);
    const docFile = await getDoc(docRef);
    const docData = docFile.data();

    const commentDocs = await getDocs(collectionRef);
    const commentData = commentDocs.docs.map((doc) => {
      return doc.data().comment;
    });

    const flattedData = commentData.flat();

    const filterComments = flattedData.filter(
      (snap) => snap.course_id == course_id
    );
    let refineComments = {};
    filterComments.map((comment) => {
      if (!refineComments[comment.video_id]) {
        refineComments[comment.video_id] = []; // Initialize with an array if it doesn't exist
      }
      refineComments[comment.video_id].push(comment);
    });
    console.log("filters", refineComments);

    res.json({ playlistData: docData, commentData: refineComments });
  } catch (e) {
    console.log("error", e);
    res.json({ error: e.message });
  }
}
