export default function (req, res) {
  console.log(req.body);
  res.json({ message: "comment added", authType: 200 });
}
