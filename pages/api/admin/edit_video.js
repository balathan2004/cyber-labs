import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "@/config";

export default async (req, res) => {
  try {
    var { video_title, video_caption, video_link, video_playlist, video_id } =
      JSON.parse(req.body);

    const docRef = doc(firestore, "playlist", video_playlist);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let videoData = docSnap.data().videos;

      // console.log(videoData);

      for (let i = 0; i < videoData.length; i++) {
        if (videoData[i].video_id == video_id) {
          videoData[i].video_title = video_title;
          videoData[i].video_link = video_link;
          videoData[i].video_caption = video_caption;
        }
      }
      await updateDoc(docRef, {
        videos: videoData,
      });

      res.json({ message: "video data updated successfully" });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
};
