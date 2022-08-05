import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useForm, SubmitHandler } from "react-hook-form";
import { FC } from "react";
import CustomCheck from "../../public/componentSVG/register/CustomCheck.svg";
import UniversitySearchBar from "../../components/Register/SearchBar";
import axios from "axios";
import { API_URL } from "../../components/api/API";
import { storage } from "../../components/Register/firebase";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import ChangeImg from "../../public/register/changeImg.svg";
import DeleteImg from "../../public/register/deleteImg.svg";

interface FormValue {
  id: string;
  university: string;
  email: string;
  password: string;
  name: string;
  nickname: string;
  profileUrl: string;
  countryCode: string;
  phone: string;
  birth: string;
  emailAgree: boolean;
  enrolledAt: number;
}

const UnivRegisterPage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 1000px;
  display: flex;
  flex-direction: column;
`; //top때문에 flex

const FormContainer = styled.div`
  display: flex;
  width: 60%;
  max-width: 1000px;

  height: 90%;
  min-width: 700px;
  min-height: 800px;
  margin: auto;
`;

const RegisterForm = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 1%;
  border-radius: 10px;
`;

const FormRight = styled.div`
  width: 70%;

  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 30%;
  height: 30%;
  margin-top: 5%;
  input::file-selector-button {
    display: none;
  }
`;

const RegisterSelect = styled.select`
  width: 100%;
  height: 5%;
  background: #ffffff;
  border: 1px solid #aaaaaa;
  border-radius: 0.5rem;
  font-size: 1rem;
`;

const RegisterInput = styled.input`
  width: 100%;
  height: 5%;
  background: #ffffff;
  border: 1px solid #aaaaaa;
  border-radius: 0.5rem;
  font-size: 1rem;
`;

const RegisterDiv = styled.div`
  width: 100%;
  height: 5%;
  background: #ffffff;
  border: 1px solid #aaaaaa;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

const InputButton = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 5%;
`;

const InputWithButton = styled.input`
  width: 78%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #aaaaaa;
  border-radius: 0.5rem;
`;

const ConfirmButton = styled.button`
  width: 20%;
  height: 100%;
  color: white;
  background: #47d2d2;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  text-align: center;
  border: none;
  cursor: pointer;
  &:hover {
    font-weight: 700;
  }
`;

const RegisterButton = styled.button<{ agree: boolean }>`
  background-color: ${(props) => (props.agree ? "#47d2d2" : "#aaaaaa")};
  border-radius: 10px;
  border: none;
  color: #ffffff;
  width: 100%;
  max-width: 1000px;
  min-width: 700px;
  height: 5%;
  margin: auto;
  cursor: ${(props) => (props.agree ? "pointer" : "arrow")};
  &:hover {
    border: 2px solid black;
  }
`;

const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid black;
`;

const Message = styled.span<{ agree: boolean }>`
  font-size: 0.8rem;
  color: ${(props) => (props.agree ? "#47d2d2" : "#aaaaaa")};
  cursor: pointer;
`;
const ErrorMessage = styled.p`
  font-size: 0.8rem;
  color: red;
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding-left: 1rem;
  border-left: 0.25rem solid #50d5d5;
`;
const BoldText = styled.div`
  font-weight: bold;
`;

const yearValue = Array.from(new Array(10), (x, i) => Number(new Date().getFullYear()) - i);

const SignUpForm: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("password");

  const [result, setResult] = useState("");
  const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
    data["university"] = university.idx;
    data["profileUrl"] = displayImage;
    setResult(JSON.stringify(data));
  };
  const [university, setUniversity] = useState({ name: "", idx: null });
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const [id, setId] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [verify, setVerify] = useState<string>("");
  const [emailAuth, setEmailAuth] = useState<boolean>(false);

  const [firstPW, setFirstPW] = useState<string>("");
  const [secondPW, setSecondPW] = useState<string>("");

  const [emailAgree, setEmailAgree] = useState<boolean>(false);
  const [serviceAgree, setServiceAgree] = useState<boolean>(false);
  const [privacyAgree, setPrivacyAgree] = useState<boolean>(false);

  const [imageUpload, setImageUpload] = useState(null);
  const [displayImage, setDisplayImage] = useState<string>(null);
  const [imageRef, setImageRef] = useState(null);
  const handleSearchOpen = () => {
    setSearchOpen(!searchOpen);
  };
  const SendCertification = () => {
    document.getElementById("sendEmail").setAttribute("readOnly", "readOnly");
    axios
      .post(API_URL + "users/code", { email: email })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const VerifyCertification = () => {
    axios
      .post(API_URL + "users/verify", { email: email, code: verify })
      .then((res) => {
        if (res.data.isSuccess) {
          setEmailAuth(true);
          alert("인증되었습니다.");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const CheckOverlap = ({ type }) => {
    if (type === "id") {
      axios.get(API_URL + "users/check", { params: { id: id } }).then((res) => {
        if (res.data.isSuccess) {
          alert("처음 ");
        } else {
          alert("중복된 아이디입니다.");
        }
      });
    }
    if (type === "nickname") {
      axios.get(API_URL + "users/check", { params: { nickname: nickname } }).then((res) => {
        if (res.data.isSuccess) {
          alert("처음 ");
        } else {
          alert("중복된 아이디입니다.");
        }
      });
    }
  };

  const onInputChange = ({ target, event }) => {
    if (target === "id") {
      setId(event.target.value);
    }
    if (target === "nickname") {
      setNickname(event.target.value);
    }
  };

  const storeImage = async () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `profile/${uuidv4()}`);
    await setImageRef(imageRef);
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setDisplayImage(url);
      }); //그냥 올리고 store안하고 삭제하면 오류 뜸.
    });
  };
  const onImageChange = (event) => {
    if (imageRef !== null) {
      console.log("imageRef", imageRef);
      clearImage();
    }
    if (event.target.value) {
      const {
        target: { files },
      } = event;
      console.log("files", files);

      const theImage = files[0];
      setImageUpload(theImage);
      const reader: FileReader = new FileReader();
      reader.onloadend = () => {
        const fileUrl = reader.result.toString();
        setDisplayImage(fileUrl);
        console.log(fileUrl);
      };
      reader.readAsDataURL(theImage);
    }
  };
  const clearImage = async () => {
    setImageUpload(null);
    setDisplayImage(null);
    await deleteObject(imageRef).catch((err) => {
      alert(err);
    });
    setImageRef(null);
  };

  useEffect(() => {
    storeImage();
  }, [imageUpload]);

  useEffect(() => {
    console.log("err", errors);
  }, [errors]);

  //https://codingsalon.tistory.com/62 스타일 지정
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <RegisterForm id="register-form" onSubmit={handleSubmit(onSubmitHandler)}>
        <Profile>
          <BoldText>프로필 사진</BoldText>
          <div>
            <ProfileImg src={displayImage !== null ? displayImage : "/basicProfileImg.jpg"} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-evenly", width: "30%" }}>
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
        </Profile>
        <FormRight>
          <Title>회원가입</Title>
          <BoldText>학교 인증</BoldText>
          <RegisterSelect
            {...register("enrolledAt", {
              required: true,
            })}
            placeholder="입학년도 선택(학번)"
            defaultValue="default"
          >
            <option value="default" disabled hidden>
              입학년도 선택 (학번)
            </option>
            {yearValue.map((v, i) => (
              <option value={v} key={`year${i}`}>
                {v}
              </option>
            ))}
          </RegisterSelect>
          <RegisterDiv onClick={handleSearchOpen}>
            {university.name === "" ? "학교 이름을 검색하세요." : <div>{university.name}</div>}
          </RegisterDiv>
          {university.name === "" && <ErrorMessage>필수로 입력해야 하는 항목입니다.</ErrorMessage>}
          <InputButton>
            <InputWithButton
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "이메일 형식에 맞춰주세요",
                },
              })}
              id="sendEmail"
              type="text"
              placeholder="학교 이메일"
              autoComplete="off"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            {"email" in errors || !email ? (
              <ConfirmButton style={{ background: "#aaaaaa" }}>인증번호 전송</ConfirmButton>
            ) : (
              <ConfirmButton onClick={SendCertification}>인증번호 전송</ConfirmButton>
            )}
            {/* <ConfirmButton onClick={SendCertification}>인증번호 전송</ConfirmButton> */}
          </InputButton>
          {errors.email && errors.email.type === "required" && (
            <ErrorMessage>필수로 입력해야 하는 항목입니다.</ErrorMessage>
          )}
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <InputButton>
            <InputWithButton
              type="text"
              placeholder="인증번호 확인"
              onChange={(e) => setVerify(e.currentTarget.value)}
            />
            <ConfirmButton onClick={VerifyCertification}>인증번호 확인</ConfirmButton>
          </InputButton>
          <Message style={{ cursor: "default" }} agree={false}>
            서비스와 관련된 소식 및 알림 등 다양한 정보를 제공합니다.
          </Message>
          <div style={{ display: "flex" }} onClick={() => setEmailAgree(!emailAgree)}>
            <CustomCheck fill={emailAgree ? "#47d2d2" : "#aaaaaa"} style={{ cursor: "pointer" }} />
            <Message style={{ marginLeft: "1%" }} agree={emailAgree}>
              E-mail 수신동의(선택)
            </Message>
          </div>
          <BoldText>정보 입력</BoldText>
          <InputButton>
            <InputWithButton
              {...register("id", {
                required: true,
              })}
              type="text"
              placeholder="아이디"
              onChange={(e) => onInputChange({ target: "id", event: e })}
            />
            <ConfirmButton onClick={() => CheckOverlap({ type: "id" })}>중복 확인</ConfirmButton>
          </InputButton>
          {errors.id && errors.id.type === "required" && <ErrorMessage>필수로 입력해야 하는 항목입니다.</ErrorMessage>}
          <RegisterInput
            {...register("password", {
              required: true,
            })}
            type="password"
            placeholder="비밀번호"
            autoComplete="new-password"
            onChange={(e) => setFirstPW(e.target.value)}
          />
          {errors.password && errors.password.type === "required" && (
            <ErrorMessage>필수로 입력해야 하는 항목입니다.</ErrorMessage>
          )}
          <RegisterInput type="password" placeholder="비밀번호 확인" onChange={(e) => setSecondPW(e.target.value)} />
          {secondPW !== "" && firstPW !== secondPW && <ErrorMessage>비밀번호가 다릅니다.</ErrorMessage>}
          <RegisterInput
            {...register("name", {
              required: true,
            })}
            placeholder="이름"
          />
          {errors.name && errors.name.type === "required" && (
            <ErrorMessage>필수로 입력해야 하는 항목입니다.</ErrorMessage>
          )}
          <InputButton>
            <InputWithButton
              {...register("nickname", {
                required: true,
              })}
              type="text"
              placeholder="닉네임"
              onChange={(e) => onInputChange({ target: "nickname", event: e })}
            />
            <ConfirmButton onClick={() => CheckOverlap({ type: "nickname" })}>중복 확인</ConfirmButton>
          </InputButton>
          {errors.nickname && errors.nickname.type === "required" && (
            <ErrorMessage>필수로 입력해야 하는 항목입니다.</ErrorMessage>
          )}
          <InputButton>
            <RegisterSelect
              {...register("countryCode", {
                required: true,
              })}
              defaultValue="default"
              style={{ width: "15%", height: "100%" }}
            >
              <option value="default">+82</option>
            </RegisterSelect>
            <RegisterInput
              {...register("phone", {
                required: true,
              })}
              placeholder="휴대전화번호"
              style={{ width: "84%", height: "100%" }}
            />
          </InputButton>
          <RegisterInput
            {...register("birth", {
              required: true,
            })}
            type="date"
            placeholder="생년월일"
          ></RegisterInput>
          {errors.birth && errors.birth.type === "required" && (
            <ErrorMessage>필수로 입력해야 하는 항목입니다.</ErrorMessage>
          )}
          <BoldText>약관 동의</BoldText>
          <div style={{ display: "flex" }} onClick={() => setServiceAgree(!serviceAgree)}>
            <CustomCheck fill={serviceAgree ? "#47d2d2" : "#aaaaaa"} style={{ cursor: "pointer" }} />
            <Message style={{ marginLeft: "1%" }} agree={serviceAgree}>
              서비스 이용 약관 동의 (필수)
            </Message>
          </div>
          <div style={{ display: "flex" }} onClick={() => setPrivacyAgree(!privacyAgree)}>
            <CustomCheck fill={privacyAgree ? "#47d2d2" : "#aaaaaa"} style={{ cursor: "pointer" }} />
            <Message style={{ marginLeft: "1%" }} agree={privacyAgree}>
              개인정보 수집 및 이용 동의 (필수)
            </Message>
          </div>
          {result}
        </FormRight>
        {searchOpen && (
          <UniversitySearchBar
            isOpen={searchOpen}
            handleOpen={handleSearchOpen}
            university={university}
            setUniversity={setUniversity}
          />
        )}
      </RegisterForm>
      <RegisterButton
        type="submit"
        form="register-form"
        // disabled={!privacyAgree || !serviceAgree || Boolean(Object.keys(errors).length)}
        agree={privacyAgree && serviceAgree && !Object.keys(errors).length}
        onClick={() => console.log(email)}
      >
        회원가입
      </RegisterButton>
    </div>
  );
};

const UnivRegister = () => {
  return (
    <UnivRegisterPage>
      <FormContainer>
        <SignUpForm />
      </FormContainer>
    </UnivRegisterPage>
  );
};

UnivRegister.getInitialProps = async () => {
  const pathname = "/register";
  return { pathname };
};

export default UnivRegister;
