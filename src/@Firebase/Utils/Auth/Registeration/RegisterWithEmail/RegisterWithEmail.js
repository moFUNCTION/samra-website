import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { auth, db, storage } from "../../../../Config/Config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export class Email_Registeration {
  #collection = "Users";
  constructor({ email, password, phoneNumber, image, username }) {
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.image = image;
    this.username = username;
    this.EmailSearchKey = email.toUpperCase();
    this.UsernameSearchKey = username.toUpperCase();
  }
  async #uploadImage({ file }) {
    const ImagePath = `Users/${file.name + v4()}`;
    const ImageRef = ref(storage, ImagePath);
    const uploadReq = await uploadBytes(ImageRef, file);
    const URL = await getDownloadURL(uploadReq.ref);
    return { URL, Path: ImagePath };
  }
  async #SaveToFirestore({ userID, image, imagePath }) {
    const dataSaved = {
      displayName: this.username,
      email: this.email,
      phoneNumber: this.phoneNumber,
      photoURL: `https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=${Math.random()}`,
      createdAt: serverTimestamp(),
      EmailSearchKey: this.EmailSearchKey,
      UsernameSearchKey: this.UsernameSearchKey,
    };
    if (image) {
      dataSaved.photoURL = image;
    }
    if (imagePath) {
      dataSaved.photoPath = imagePath;
    }
    const userDoc = doc(db, this.#collection, userID);
    const saveReq = await setDoc(userDoc, dataSaved);
    return saveReq;
  }
  async createUserRequiest() {
    try {
      const signUpReq = await createUserWithEmailAndPassword(
        auth,
        this.email,
        this.password
      );
      if (this.image) {
        const { URL, Path } = await this.#uploadImage({ file: this.image });
        const saveToDbReq = await this.#SaveToFirestore({
          userID: signUpReq.user.uid,
          image: URL,
          imagePath: Path,
        });
        return signUpReq;
      }
      const saveToDbReq = await this.#SaveToFirestore({
        userID: signUpReq.user.uid,
      });
      return signUpReq;
    } catch (err) {
      throw new Error(err.code || err);
    }
  }
}
