// import { storage } from "../Register/firebase";
// import { getDownloadURL, ref } from "firebase/storage";
// import { useState } from "react";

// // const storeImage = async () => {
// //   if (imageUpload === null) return;
// //   const imageRef = ref(storage, `profile/${postImage}`);
// //   await setImageRef(imageRef);
// //   uploadBytes(imageRef, imageUpload).then(() => {
// //     getDownloadURL(imageRef).then((url) => {
// //       setDisplayImage(url);
// //     }); //그냥 올리고 store안하고 삭제하면 오류 뜸.
// //   });
// // };

// const clearImage = async () => {
//   setImageUpload(null);
//   setDisplayImage(null);
//   deleteObject(imageRef).catch((err) => {
//     alert(err);
//   });
//   setImageRef(null);
// };
// export const getProfileImgUrl = async (url = "", method) => {
//   try {
//     const imageRef = await ref(storage, "profile/5a75331c-aa25-4f4f-8754-17291d823cc8");
//     getDownloadURL(imageRef).then((url) => {
//       console.log(url);
//       console.log(typeof url);
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };
// const onImageChange = async (event) => {
//   if (imageRef !== null) {
//     console.log("imageRef", imageRef);
//     await clearImage();
//   }
//   if (event.target.value) {
//     const {
//       target: { files },
//     } = event;
//     console.log("files", files);

//     const theImage = files[0];
//     setImageUpload(theImage);
//     setPostImage(uuidv4());
//     const reader: FileReader = new FileReader();
//     reader.onloadend = () => {
//       const fileUrl = reader.result.toString();
//       setDisplayImage(fileUrl);
//     };
//     reader.readAsDataURL(theImage);
//   }
// };
