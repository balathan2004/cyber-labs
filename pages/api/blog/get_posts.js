import { firestore } from "@/config";
import { getDocs, collection } from "firebase/firestore";

export default async (req, res) => {
  try {
    const ref = collection(firestore, "blog");

    const documents = await getDocs(ref);

    const docData = documents.docs.map((doc) => doc.data());

    res.json({ status: 200, data: docData });
  } catch (err) {
    res.json({ status: 400, data: [] });
  }
};
