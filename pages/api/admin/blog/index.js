import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/config";
export default async (req, res) => {
  try {
    if (req.method == "GET") {
      const collectionRef = collection(firestore, "/blog");
      const data = await getDocs(collectionRef);
      const finalData = data.docs.map((doc) => doc.data());
      console.log(finalData);
      res.json({ status: 200, message: finalData });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: 400, message: err });
  }
};
