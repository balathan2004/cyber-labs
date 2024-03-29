import { firestore } from "@/config";
import { setDoc, getDoc, doc } from "firebase/firestore";
export default async (req, res) => {
  console;
  if (req.cookies.cyberLabs_uid) {
    try {
      var uid = req.cookies.cyberLabs_uid;
      var document = await getDoc(doc(firestore, "users", uid));
      var docData = document.data();
      res.json({ message: docData });
    } catch (e) {
      console.log(e);
      res.json({ error: "error caught" });
    }
  } else {
    res.json({ error: "error caught" });
  }
};
