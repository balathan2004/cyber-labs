import { firestore } from "@/config";
import { getDocs, collection } from "firebase/firestore";

export default async function (req, res) {
  try {
    const allPlaylists = [];
    const docRef = collection(firestore, "playlist");

    const allDocs = await getDocs(docRef);
    allDocs.docs.map((single) => {
      allPlaylists.push({ id: single.id, data: single.data().playlist_info });
    });
    res.json({ data: allPlaylists, authType: 200 });
  } catch (err) {
    console.error(err);
    res.json({ error: err });
  }
}
