import { IncomingForm } from "formidable";
import uploadImage from "@/components/uploadImage";
const fs = require("fs");
import { firestore } from "@/config";
import moment from "moment";

export const config = {
  api: {
    bodyParser: false,
  },
};

import { doc, addDoc, getDocs, collection } from "firebase/firestore";

export default async function (req, res) {
  if (req.cookies.cyberLabs_Admin == process.env.ADMIN_NAME) {
    post(req, res);
  } else {
    res.json({ error: "unauthorized access" });
  }
}

async function post(req, res) {
  try {
    let allPlaylists = [];
    const form = new IncomingForm();

    form.parse(req, async (err, fields, file) => {
      const playlist_name = fields.playlist_name[0];
      const playlist_description = fields.playlist_description[0];

      const fileBuffer = await saveFile(file.file[0]);
      const fileDownloadUrl = await uploadImage(
        fileBuffer,
        "/video",
        playlist_name
      );

      const playlist_data = {
        playlist_thumbnail: fileDownloadUrl,
        playlist_name: playlist_name,
        playlist_description: playlist_description,
      };

      allPlaylists = await docManager(playlist_data);
      res.json({
        message: "playlist created successfully",
        authType: 200,
        playlistName: allPlaylists,
      });
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "playlist updation error", authType: 400 });
  }
}

async function saveFile(file) {
  const FileData = fs.readFileSync(file.filepath);
  return FileData;
}

async function docManager(playlist_data) {
  const currentTime = new Date();
  const modifiedTime = moment(currentTime).format("DD-MMM-yyyy hh:mmA");

  await addDoc(collection(firestore, "playlist"), {
    playlist_info: {
      content: "created at " + modifiedTime,
      playlist_name: playlist_data.playlist_name,
      playlist_thumbnail: playlist_data.playlist_thumbnail,
      playlist_description: playlist_data.playlist_description,
    },
  });

  const allPlaylists = [];
  const docRef = collection(firestore, "playlist");

  const allDocs = await getDocs(docRef);
  allDocs.docs.map((single) => {
    allPlaylists.push({ id: single.id, data: single.data().playlist_info });
  });
  return allPlaylists;
}
