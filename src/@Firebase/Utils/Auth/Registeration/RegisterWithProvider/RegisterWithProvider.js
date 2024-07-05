import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import {
  doc,
  getDoc,
  getDocsFromServer,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, facebookAuth, googleAuth } from "../../../../Config/Config";

export class Provider_Registeration {
  #collection = "Users";
  constructor({ provider, phoneNumber }) {
    this.provider = provider;
    this.phoneNumber = phoneNumber;
  }
  async #CheckIfUserExist(userDoc) {
    const userRes = await getDoc(userDoc);
    return userRes.exists();
  }
  async #SaveToFireStore({ email, userID, photoURL, username }) {
    const userDoc = doc(db, this.#collection, userID);
    const isUserExist = this.#CheckIfUserExist(userDoc);
    if (!isUserExist) {
      const req = await setDoc(userDoc, {
        email: email,
        displayName: username,
        phoneNumber: this.phoneNumber,
        photoURL,
        createdAt: serverTimestamp(),
        EmailSearchKey: email.toUpperCase(),
        UsernameSearchKey: username.toUpperCase(),
      });
    }
  }

  async SignToProviderRequist() {
    try {
      const signReq = await signInWithPopup(auth, this.provider);
      const addUserToFirestore = await this.#SaveToFireStore({
        email: signReq.user.email,
        userID: signReq.user.uid,
        photoURL: signReq.user.photoURL,
        username: signReq.user.displayName,
      });
      return signReq;
    } catch (err) {
      throw new Error(err.code || err);
    }
  }
}
export class GoogleRegisteration extends Provider_Registeration {
  constructor({ phoneNumber, provider = googleAuth }) {
    super({ phoneNumber, provider });
  }
}
export class FacebookRegisteration extends Provider_Registeration {
  constructor({ phoneNumber, provider = facebookAuth }) {
    super({ phoneNumber, provider });
  }
}
