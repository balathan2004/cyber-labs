import { firestore } from "@/config";
import moment from "moment";
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

export default async function (req, res) {
  try {
    const time = new Date();

    const modifiedTime = moment(time).format("DD-MM-YYYY hh:mm-A");
    console.log(modifiedTime);

    const commentData = JSON.parse(req.body);
    commentData.time = modifiedTime;
    const { video_id, course_id } = commentData;
    console.log(commentData);

    const docName = `${course_id}@${video_id}`;
    const docRef = doc(firestore, "comments", docName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //   var docData = docRef.data().data;
      //  console.log(docData);
      await updateDoc(docRef, {
        comment: arrayUnion(commentData),
      });
    } else {
      var modifiedData = { comment: [commentData] };
      await setDoc(docRef, modifiedData);
    }
    res.json({ message: "comment Added" });
  } catch (e) {
    res.json({ message: e.code });
  }
}
