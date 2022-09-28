import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../Register/firebase";

const getImageUrl = async (imageUrl) => {
  let url = null;
  if (imageUrl !== null) {
    console.log("this is not null");

    const storageRef = ref(storage, `${imageUrl}`);
    url = await getDownloadURL(storageRef);
    return url;
  }

  return null;
};

export default getImageUrl;
