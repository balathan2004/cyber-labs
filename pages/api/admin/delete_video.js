import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "@/config";

export default async (req, res) => {
  console.log("sdhdieis");
  const { course_id, video_id } = JSON.parse(req.body);

  const docRef = doc(firestore, "playlist", course_id);
  const docSnap = await getDoc(docRef);
  const videoData = docSnap.data().videos;

  const filteredVideos = videoData.filter((ele) => ele.video_id != video_id);
  console.log(filteredVideos);

  await updateDoc(docRef, {
    videos: filteredVideos,
  });

  res.json({ message: "deleted" });
};
