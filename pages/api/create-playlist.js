import { IncomingForm } from "formidable";
import uploadImage from "@/components/uploadImage";
const fs = require("fs");
import { firestore } from "@/config";
import moment from "moment";

import { doc, addDoc, getDocs, collection } from "firebase/firestore";

export default async function (req, res) {
  try {
    var { playlist_name } = JSON.parse(req.body);

    const currentTime = new Date();
    const modifiedTime = moment(currentTime).format("DD-MMM-yyyy hh:mmA");

    await addDoc(collection(firestore, "playlist"), {
      playlist_info: {
        content: "created at " + modifiedTime,
        playlist_name: playlist_name,
      },
    });

    const allPlaylists = [];
    const docRef = collection(firestore, "playlist");

    const allDocs = await getDocs(docRef);
    allDocs.docs.map((single) => {
      allPlaylists.push({ id: single.id, data: single.data().playlist_info });
    });

    res.json({
      message: "playlist updated",
      authType: 200,
      playlistName: allPlaylists,
    });
  } catch (e) {
    console.log(e);
    res.json({ message: "playlist updation error", authType: 400 });
  }
}
