import { firestore } from "@/config";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default async function (req, res) {
  const {
    course_id,
    video_id,
    comment_id,
    comment,
    comment_user,
    time,
    comment_reply,
  } = JSON.parse(req.body);

  var docName = `${course_id}@${video_id}`;

  const docRef = doc(firestore, "comments", docName);

  const docData = (await getDoc(docRef)).data();
  console.log(docData);

  const docComment = docData.comment.find(
    (file) => file.comment_id == comment_id
  );

  const otherComments = docData.comment.filter(
    (file) => file.comment_id != comment_id
  );

  if (docComment.hasReplies && docComment.hasReplies.length > 0) {
    const replyData = {
      comment: comment,
      comment_id: comment_id,
      comment_user: comment_user,
      time: time,
      comment_reply: comment_reply,
    };

    docComment.hasReplies.push(replyData);
    otherComments.push(docComment);
    await updateDoc(docRef, { comment: otherComments });
  } else {
    const replyData = {
      comment: comment,
      comment_id: comment_id,
      comment_user: comment_user,
      time: time,
    };
    docComment.hasReplies = [];
    docComment.hasReplies.push(replyData);
    otherComments.push(docComment);
    await updateDoc(docRef, { comment: otherComments });
  }

  res.json({ message: "comment added", authType: 200 });
}
