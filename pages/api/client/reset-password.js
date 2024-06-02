import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "@/config";
export default async function (req, res) {
  const { email } = JSON.parse(req.body);

  try {
    const auth = getAuth(app);
    await sendPasswordResetEmail(auth, email);

    res.json({ authType: 200, message: "Instructions sent to email" });
  } catch (e) {
    res.json({ authType: 400, message: "Reset Failed , Enter valid Email" });
  }
}
