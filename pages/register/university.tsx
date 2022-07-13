import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useForm, SubmitHandler } from "react-hook-form";
import { FC } from "react";
import CustomCheck from "../../public/componentSVG/register/CustomCheck.svg";
import UniversitySearchBar from "../../components/Register/SearchBar";
import axios from "axios";
import { API_URL } from "../../components/api/API";
import { storage } from "../../components/Register/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";

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
  width: 30%;
  height: 100%;
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

const RegisterButton = styled.button`
  background-color: #47d2d2;
  border-radius: 10px;
  border: none;
  color: #ffffff;
  width: 60%;
  max-width: 1000px;
  min-width: 700px;
  height: 5%;
  margin: auto;
  cursor: pointer;
  &:hover {
    border: 2px solid black;
  }
`;

const ProfileInput = styled.input`
  width: 100px;
  height: 50px;
`;

const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
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
    data["university"] = university;
    setResult(JSON.stringify(data));
  };
  const [university, setUniversity] = useState<string>("");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [verify, setVerify] = useState<string>("");

  const [emailAgree, setEmailAgree] = useState<boolean>(false);
  const [serviceAgree, setServiceAgree] = useState<boolean>(false);
  const [privacyAgree, setPrivacyAgree] = useState<boolean>(false);

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
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const[attachment,setAttachment]
  //https://nomadcoders.co/nwitter/lectures/1926
  const onImageChange = (event) => {
    const {
      target: { files },
    } = event;
    const theImage = files[0];
    const reader = new FileReader();
    reader.onloadend=(finishedEvent)=>{}
    reader.readAsDataURL(theImage);
  };
  // const [image, setImage] = useState(null);
  // const [imageURL, setImageURL] = useState(null);
  // const handleImageChange = (e) => {
  //   if (e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };
  // const handleImageSubmit = () => {
  //   const imageRef = ref(storage, "image");
  //   uploadBytes(imageRef, image)
  //     .then(() => {
  //       getDownloadURL(imageRef)
  //         .then((url) => {
  //           setImageURL(url);
  //         })
  //         .catch((err) => {
  //           console.log(err.message, "image error");
  //         });
  //       setImage(null);
  //     })
  //     .catch((err) => {
  //       console.log(err.message, "image error");
  //     });
  // };
  // const onClearImage = () => {
  //   setImageURL(null);
  //   setImage(null);
  // };

  return (
    <RegisterForm id="register-form" onSubmit={handleSubmit(onSubmitHandler)}>
      <Profile>
        {/* <ProfileImg src={imageURL} />
        <ProfileInput type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleImageSubmit}>submit</button>
        <button onClick={onClearImage}>clear</button> */}
        <input type="file" accept="image/*" onChange={onImageChange} />
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
          {university === "" ? "학교 이름을 검색하세요." : <div>{university}</div>}
        </RegisterDiv>
        {university === "" && <ErrorMessage>필수로 입력해야 하는 항목입니다.</ErrorMessage>}
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
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <ConfirmButton onClick={SendCertification}>인증번호 전송</ConfirmButton>
        </InputButton>
        {errors.email && errors.email.type === "required" && (
          <ErrorMessage>필수로 입력해야 하는 항목입니다.</ErrorMessage>
        )}
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        <InputButton>
          <InputWithButton type="text" placeholder="인증번호 확인" onChange={(e) => setVerify(e.currentTarget.value)} />
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
          />
          <ConfirmButton>중복 확인</ConfirmButton>
        </InputButton>
        {errors.id && errors.id.type === "required" && <ErrorMessage>필수로 입력해야 하는 항목입니다.</ErrorMessage>}
        <RegisterInput
          {...register("password", {
            required: true,
          })}
          type="password"
          placeholder="비밀번호"
        />
        {errors.password && errors.password.type === "required" && (
          <ErrorMessage>필수로 입력해야 하는 항목입니다.</ErrorMessage>
        )}
        <RegisterInput type="password" placeholder="비밀번호 확인" />
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
          />
          <ConfirmButton>중복 확인</ConfirmButton>
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
            개인정보 수집 및 이용 동의
          </Message>
        </div>
        {result}
      </FormRight>
      {searchOpen && (
        <UniversitySearchBar isOpen={searchOpen} handleOpen={handleSearchOpen} setUniversity={setUniversity} />
      )}
    </RegisterForm>
  );
};

const UnivRegister = () => {
  return (
    <UnivRegisterPage>
      <FormContainer>
        <SignUpForm />
      </FormContainer>
      <RegisterButton type="submit" form="register-form">
        회원가입
      </RegisterButton>
    </UnivRegisterPage>
  );
};
UnivRegister.getInitialProps = async () => {
  const pathname = "/register";
  return { pathname };
};

export default UnivRegister;
