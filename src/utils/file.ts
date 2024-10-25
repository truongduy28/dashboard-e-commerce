import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
import { replaceName } from "./formater";

export const uploadFile = async (file: any, folder?: string) => {
  // const newFile: any = await handleResize(file);

  const filename = replaceName(file.name);

  const storageRef = ref(storage, `${folder ? folder : 'images'}/${filename}-${Date.now()}`);

  const res = await uploadBytes(storageRef, file);

  if (res) {
    if (res.metadata.size === file.size) {
      return getDownloadURL(storageRef);
    } else {
      return "Uploading";
    }
  } else {
    return "Error upload";
  }
};
