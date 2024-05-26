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
  try {
    const auth = getAuth(app);
    const data = JSON.parse(req.body);

    const { email, password, username } = data;

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        var { uid } = cred.user;
        const reDefinedData = {
          username: username,
          email: email,
          uid: uid,
          phone: null,
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
          authType: 200,
          message: "Account Created",
          data: reDefinedData,
        });
      })
      .catch((error) => {
        res.json({ authType: 400, error: error.code });
      });
  } catch (err) {
    res.json({ authType: 400, error: err.message });
  }
};
