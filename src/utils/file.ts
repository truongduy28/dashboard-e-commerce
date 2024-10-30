import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Resizer from 'react-image-file-resizer';
import { storage } from "../firebase/config";
import { replaceName } from "./formater";

export const uploadFile = async (file: File, folder?: string) => {
  const newFile: any = await handleResize(file);

  const filename = replaceName(newFile.name);

  const storageRef = ref(
    storage,
    `${folder ? folder : "images"}/${filename}`
  );

  const res = await uploadBytes(storageRef, newFile);

  if (res) {
    if (res.metadata.size === newFile.size) {
      return getDownloadURL(storageRef);
    } else {
      return "Uploading";
    }
  } else {
    return "Error upload";
  }
};


export const handleResize = (file: any) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1080,
      720,
      'JPEG',
      80,
      0,
      (newfile) => {
        newfile && resolve(newfile);
      },
      'file'
    );
  });
