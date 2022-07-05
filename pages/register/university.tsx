import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { useForm, SubmitHandler } from "react-hook-form";
import { FC } from "react";
import CustomCheck from "../../public/componentSVG/register/CustomCheck.svg";

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
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Profile = styled.div`
  width: 20%;
  height: 100%;
`;

const RegisterSelect = styled.select`
  width: 100%;
  height: 5%;
  background: #ffffff;
  border: 1px solid #aaaaaa;
  border-radius: 0.5rem;
`;

const RegisterInput = styled.input`
  width: 100%;
  height: 5%;
  background: #ffffff;
  border: 1px solid #aaaaaa;
  border-radius: 0.5rem;
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
  min-width: 700px;
  height: 5%;
  margin: auto;
  cursor: pointer;
  &:hover {
    border: 2px solid black;
  }
`;

// const CheckBox = styled.div<{ checked: boolean }>`
//   width: 0.8rem;
//   height: 0.8rem;
//   border
// `;

const Message = styled.span`
  font-size: 0.8rem;
  color: #aaaaaa;
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
    setResult(JSON.stringify(data));
  };
  return (
    <RegisterForm id="register-form" onSubmit={handleSubmit(onSubmitHandler)}>
      <Profile></Profile>
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
        <RegisterInput
          {...register("university", {
            required: true,
          })}
          type="text"
          placeholder="학교 이름을 검색하세요"
        />
        <InputButton>
          <InputWithButton
            {...register("email", {
              required: true,
            })}
            type="text"
            placeholder="학교 이메일"
          />
          <ConfirmButton>인증번호 전송</ConfirmButton>
        </InputButton>
        <InputButton>
          <InputWithButton type="text" placeholder="인증번호 확인" />
          <ConfirmButton>인증번호 확인</ConfirmButton>
        </InputButton>
        <Message>서비스와 관련된 소식 및 알림 등 다양한 정보를 제공합니다.</Message>
        <div style={{ display: "flex" }}>
          {/* <input
            {...register("emailAgree", {})}
            type="checkbox"
            placeholder="인증번호 확인"
            style={{ background: "#47d2d2" }}
          /> */}
          <CustomCheck fill="#47d2d2" />
          <Message style={{ color: "#47d2d2", marginLeft: "1%" }}>E-mail 수신동의(선택)</Message>
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
        <RegisterInput
          {...register("password", {
            required: true,
          })}
          type="password"
          placeholder="비밀번호"
        />
        <RegisterInput type="password" placeholder="비밀번호 확인" />
        <RegisterInput
          {...register("name", {
            required: true,
          })}
          placeholder="이름"
        />
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
        <RegisterInput
          {...register("countryCode", {
            required: true,
          })}
          placeholder="+82"
        />
        <RegisterInput
          {...register("phone", {
            required: true,
          })}
          placeholder="휴대전화번호"
        />
        <RegisterSelect
          {...register("birth", {
            required: true,
          })}
          placeholder="생년월일"
        >
          <option>2011</option>
        </RegisterSelect>
        <BoldText>약관 동의</BoldText>
        {/* <RegisterInput {...register("profileUrl", {})} /> */}
        {/* <RegisterButton type="submit">회원가입</RegisterButton> */}
        {result}
      </FormRight>
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
