import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "@/config";
import { IncomingForm } from "formidable";
import uploadImage from "@/components/uploadImage";
const fs = require("fs");
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  console.log("requested");
  post(req, res);
};

const post = async (req, res) => {
  try {
    const form = new IncomingForm();

    form.parse(req, async (res, fields, file) => {
      var { course_id, video_id } = fields;
      const video_details = {
        course_id: course_id[0],
        video_id: video_id[0],
      };

      console.log(video_details, file);

      var videoName = video_details.video_id;
      const fileBuffer = await saveFile(file.file[0]);
      const fileDownloadUrl = await uploadImage(
        fileBuffer,
        "/video",
        videoName
      );
      var video_thumbnail = fileDownloadUrl;
      const docRef = doc(firestore, "playlist", video_details.course_id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let videoData = docSnap.data().videos;

        // console.log(videoData);

        for (let i = 0; i < videoData.length; i++) {
          if (videoData[i].video_id == video_details.video_id) {
            videoData[i].video_thumbnail = video_thumbnail;
          }
        }

        await updateDoc(docRef, {
          videos: videoData,
        });
      }
    });

    res.json({ message: "video added" });
  } catch (err) {
    console.log(err);
    res.json({ message: "video not added" });
  }
};

async function saveFile(file) {
  const FileData = fs.readFileSync(file.filepath);
  return FileData;
}
