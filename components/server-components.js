import Jimp from "jimp";

export async function saveFile(file) {
  const image = await Jimp.read(file.filepath);
  const changedImage = image.resize(640, 360).quality(55);
  const fileBuffer = await changedImage.getBufferAsync(Jimp.MIME_JPEG);
  return fileBuffer;
}
