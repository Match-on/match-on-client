import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { storage } from "../Register/firebase";
import { v4 as uuidv4 } from "uuid";
import ChangeImg from "../../public/register/changeImg.svg";
import DeleteImg from "../../public/register/deleteImg.svg";
import styled from "@emotion/styled";
import axios from "axios";
import { API_URL } from "../api/API";
import { useAppDispatch, useAppSelector } from "../../src/hooks/hooks";
import { useSession } from "next-auth/react";
import { changeUserInfo } from "../../src/redux/reducers/user";
interface ImageStyle {
  size: number[];
  mode?: string;
  imageUrl: string | null;
}
const ImgContainer = styled.div<{ height; width; mode }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.width}px`};
  height: ${(props) =>
    props.mode === "change"
      ? `calc(${props.height}px + 25px)`
      : `${props.height}px`};
  .icon_container {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
  }
`;
const ProfileImg = styled.img<{ mode: string }>`
  width: 100%;
  height: ${(props) =>
    props.mode === "change" ? `calc(100% - 25px)` : `100%`};
  border-radius: 50%;
  border: 2px solid black;
`;
const ProfileImage: React.FC<ImageStyle> = (props) => {
  const { data: session, status } = useSession();
  const [displayImage, setDisplayImage] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const userIdx = useAppSelector((state) => state.user.value.userIdx);

  const dispatch = useAppDispatch();
  const onImageChange = async (event) => {
    if (imageRef !== null) {
      console.log("imageRef", imageRef);
      // await clearImage();
    }
    if (event.target.value) {
      const {
        target: { files },
      } = event;

      const theImage = files[0];

      const reader: FileReader = new FileReader();
      setImageUpload(theImage);
      setImageUrl(uuidv4()); //타입
      reader.onloadend = () => {
        const fileUrl = reader.result.toString();
        setDisplayImage(fileUrl);
      };
      reader.readAsDataURL(theImage);
    }
  };
  const storeImage = async () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `${imageUrl}`);
    await setImageRef(imageRef);
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setDisplayImage(url);
      }); //그냥 올리고 store안하고 삭제하면 오류 뜸.
    });
  };
  const downloadImage = async (url) => {
    const imageRef = ref(storage, `${url}`);
    await setImageRef(imageRef);
    getDownloadURL(imageRef).then((url) => {
      setDisplayImage(url);
    });
  };
  const clearImage = async () => {
    setImageUpload(null);
    setDisplayImage(null);
    deleteObject(imageRef).catch((err) => {
      alert(err);
    });
    setImageRef(null);
  };
  const patchUserInfo = async () => {
    try {
      const res = await axios.patch(
        API_URL + `users/${userIdx}`,
        {
          // password: "admin**00",
          profileUrl: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      dispatch(changeUserInfo({ payload: imageUrl, type: "profileUrl" }));
    } catch (err) {
      console.log(err.response);
    }
  };
  useEffect(() => {
    if (
      props.imageUrl !== null &&
      props.imageUrl !== "" &&
      imageUpload === null
    ) {
      downloadImage(props.imageUrl);
      console.log("zz");
    }
  }, [props]);
  useEffect(() => {
    if (imageUpload !== null) {
      storeImage();
    }
    if (session?.user && imageUpload !== null) {
      patchUserInfo();
    }
  }, [imageUpload]);
  return (
    <ImgContainer
      width={props.size[0]}
      height={props.size[1]}
      mode={props.mode}
    >
      <ProfileImg
        src={
          displayImage !== "" && displayImage !== null
            ? displayImage
            : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHBg8SBw4PEhATDg0PFRAPEA8ODQ0RFREWFhURExYYKCggGBslHRUfITEhJSkrLi4uFx8zODMtNyg5OisBCgoKDg0OFw8QGjIlHSItNy0tKy4tKzctLy0tKzgtLS0tLSstLi0rNy0tLC0tKy0rOC0tKy03LS0rLTctKy0rN//AABEIAOAA4QMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QANhABAAECAgYIBAUFAQAAAAAAAAECAwQRBSExUWFxEhMiMkGRocEzcoGxNFJiotEUQoLh8SP/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAwIBBAX/xAAdEQEBAQEAAgMBAAAAAAAAAAAAAQIRAzESIUET/9oADAMBAAIRAxEAPwDrAH0XzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe00zVPZiZ5a26nB3KtlE/XKHOu8aBInBXI/s8piWmuiaJ7cTHOMjsOViA64AAAAAAAAAAAAAAAAAAAAAAJ+F0f0ozv6v0+P1Z6OwuURXcjX4Ru4rBLW/yK5x+1jbtxbjKiIjkyBNQeVUxVGVURMcXoCBidHRMZ2NU/l8J5KyqOjOVW10SHj8L1tHSojtR+6FM7/KnrH7FSAqkAAAAAAAAAAAAAAAAAANuEtddfiPDbPKGpYaIo7VU8oZ1eRrM7VlGqNQCC4AAAAACm0hZ6rETlsnXHujLTS1Gdqmd1WXnCrXzexDU5QBpkAAAAAAAAAAAAAAAAWeiPhVfNH2VifomvK5VG+Iny/wCs79N49rMBBYAAAAABE0p+F/ypVCz0tX2KaeOfkrFsekd+wBtgAAAAAAAAAAAAAAAAZ2LnU3YqjwnzhgDroaKorpiadkxm9VOAxfUz0bnd3/l/0tonONSGpxfN7ABl0AAJnKNYrdIYzOJotTzn2h2TrlvEXGXuvvzMbNkcmkF4hQB1wAAAAAAAAAAAAAAAAAASMNjKrGqNdO6fZHHLOuy8XNrHUXNs5Tun+UiKoq2TDniJy2MXxtzyOimctrRdxdFrbVE8I1ypJnPaH8y+RLxOOqvRlR2afWUQG5OMW9AHXAAAAAAAAAAAAAAAAAAAZ2bNV6rK3H8Qs8Po+m3rudqf2s3UjUzarLdmq7P/AJ0zP2Srejaqu/MR6ytYjKNQnd1SYiDToymO9VVPLKGcaOo/V5pY58q18YiTo6jj5sKtGUz3aqo55SnB8qfGKq5oyqO5MT6Si3bNVr4lMx9l+TGca3Zus3Ec6Le/o+m58Pszw2eSsv2KrFWVyPr4SpNSp3NjWA0yAAAAAAAAAAAAAAJGDwk4ic51U79/CHmDw/8AUXOEbZ9l1RTFFMRTGUQxrXPpTOe/by3bi1RlbjKGQIqgAAAAAAADG5RFynKuM4ZAKfGYObE5066fWOaK6GqOlTlVsU2Nw39PX2e7OzhwVzrv1UtZ59xHAUTAAAAAAAAAACmOlVEU7Z1Cbou10rs1TsjZzly3kdk7eLDDWYsWoiPrO+W0HnegAAAAAAAAAAAAYX7UXrUxV4+k72YDnrlE265irbE5PFhpWzlMVRyn2V70S9iFnKAOsgAAAAAAAC60fb6GFp46/NS7XQ0R0aIiPCIhPyVTxx6AkqAAAAAAAAAAAAAA1Yu31uHqjhn9YULo3P3aehdqjdVMeqvjqfkjEBRIAAAAAAABlajO7T80fd0Cgs/Gp+an7r9LyK+MATUAAAAAAAAAAAAAAFHjIyxVfzLxR438XXz9lPH7Y8nppAVRAAAAf//Z"
        }
        mode={props.mode}
      />
      {props.mode === "change" && (
        <div className="icon_container">
          <div>
            <label htmlFor="profile_image">
              <ChangeImg />
            </label>
            <input
              type="file"
              id="profile_image"
              accept="image/*"
              style={{ position: "absolute", clip: "rect(0,0,0,0)" }}
              onChange={onImageChange}
            />
          </div>
          <div onClick={imageUpload && clearImage}>
            <DeleteImg />
          </div>
        </div>
      )}
    </ImgContainer>
  );
};

export default ProfileImage;

//약간
