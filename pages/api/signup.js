import { app } from "@/config";
import { firestore } from "@/config";
import { getAuth } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { setCookie } from "cookies-next";
export default async (req, res) => {
  const auth = getAuth(app);
  const data = JSON.parse(req.body);

  if ("email" in data) {
    console.log(data);
    const { email, password, username, phone } = data;
    console.log(data);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        var { uid } = cred.user;
        const reDefinedData = {
          username: username,
          email: email,
          uid: uid,
          phone: phone,
        };

        await setDoc(doc(firestore, "users", uid), reDefinedData);

        setCookie("cyberLabs_uid", uid, {
          req,
          res,
          maxAge: new Date(Date.now() + 900000),
          httpOnly: false,
          sameSite: "none",
          secure: "true",
        });

        res.json({
          authType: "acc200",
          message: "Account Created",
          data: reDefinedData,
        });
      })
      .catch((error) => {
        res.json({ error: error.code });
      });
  }
};
