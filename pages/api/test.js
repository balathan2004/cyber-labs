import { IncomingForm } from "formidable";
const fs = require("fs");
const Jimp = require("jimp");
const path = require("path");
import uploadImage from "@/components/uploadImage";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (req, res) {
  console.log("accessed");
  const { cyberLabs_uid } = req.cookies;

  try {
    post(req, res, cyberLabs_uid);
  } catch (e) {
    console.log("error is ", e);
  }
}

const post = async (req, res, fileName) => {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    console.log(fields, files);
    console.log(files);
    await saveFile(files.file[0], fileName);
    res.json({ message: "success" });
  });
};

async function saveFile(file, fileName) {
  const data = fs.readFileSync(file.filepath);
  try {
    await uploadImage(fileBuffer, "/processed", "fsProcessed1");
  } catch (e) {
    console.log(e);
  }
}
