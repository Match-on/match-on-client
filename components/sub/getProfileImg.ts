import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../Register/firebase";

export default async function getImageUrl(imageUrl) {
  const [returnURL, setReturnURL] = useState<string>("");
  const imageRef = await ref(storage, imageUrl);
  useEffect(() => {
    getDownloadURL(imageRef).then((url) => {
      setReturnURL(url);
    });
  }, [imageRef]);
  return returnURL;
}
