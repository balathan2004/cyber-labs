import { IncomingForm } from "formidable";
import uploadImage from "@/components/uploadImage";
import { saveFile } from "@/components/server-components";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/config";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  console.log("requested");
  await post(req, res);
};

const post = async (req, res) => {
  try {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, file) => {
      const image = file.file[0];
      const blog_id = fields.blog_id[0];
      const blog_caption = fields.blog_caption[0];
      const imageBuffer = await saveFile(image);
      const imageUrl = await uploadImage(imageBuffer, "blog", blog_id);
      await setDoc(doc(firestore, "/blog", blog_id), {
        blog_id: blog_id,
        image_url: imageUrl,
        blog_caption: blog_caption,
      });
    });
    res.json({ status: 200, message: "Success" });
  } catch (err) {
    res.json({ status: 500, message: err });
    console.log(err);
  }
};
