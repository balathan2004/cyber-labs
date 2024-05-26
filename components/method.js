import { app } from "/config";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";

import SendData from "./sendData";

export default async function GoogleLogin(changeState) {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  try {
    signInWithPopup(auth, googleProvider).then(async (data) => {
      let dataToSend = {
        username: data.user.displayName,
        email: data.user.email,
        uid: data.user.uid,
        photoUrl: data.user.photoURL,
        phone: "",
      };

      var res = await SendData("popupLogin", dataToSend);

      changeState(res);
    });
  } catch (err) {
    console.log(err);
    changeState(err.error);
  }
}

/**  
 * 
 * 
 * else if ("facebook") {
    try {
      signInWithPopup(auth, facebookProvider).then(console.log);
    } catch (err) {
      console.log(err);
    }
  }
 * 
 * 
*/
