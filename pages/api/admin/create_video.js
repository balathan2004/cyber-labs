import { IncomingForm } from "formidable";
import uploadImage from "@/components/uploadImage";
const fs = require("fs");
import { firestore } from "@/config";
import moment from "moment";

import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

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
      var { video_title, video_caption, video_link, video_playlist, video_id } =
        fields;
      var video_details = {
        video_title: video_title[0],
        video_caption: video_caption[0],
        video_link: video_link[0],
        video_playlist: video_playlist[0],
        video_id: video_id[0],
      };
      console.log(video_details);
      var videoName = video_details.video_id;
      const fileBuffer = await saveFile(file.file[0]);
      const fileDownloadUrl = await uploadImage(
        fileBuffer,
        "/video",
        videoName
      );
      video_details.video_thumbnail = fileDownloadUrl;
      const docRef = doc(firestore, "playlist", video_details.video_playlist);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          videos: arrayUnion(video_details),
        });
      } else {
        console.log("doc not found");
        setDoc(doc(firestore, "playlist", video_details.video_playlist), {
          videos: [video_details],
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
