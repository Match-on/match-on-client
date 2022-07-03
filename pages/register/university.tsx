import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { useForm, SubmitHandler } from "react-hook-form";
import { FC } from "react";

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
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  display: flex;
  width: 60%;
  height: 80%;
  margin: auto;
`;

const RegisterForm = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const FormRight = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2%;
`;

const Profile = styled.div`
  width: 20%;
  height: 100%;
  background-color: #aaaaaa;
`;

const RegisterInput = styled.input`
  width: 100%;
  height: 7%;
  background: #ffffff;
  border: 1px solid #aaaaaa;
  border-radius: 0.5rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding-left: 1rem;
  border-left: 0.25rem solid #50d5d5;
`;

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
    console.log(data);
    setResult(JSON.stringify(data));
  };
  return (
    <RegisterForm onSubmit={handleSubmit(onSubmitHandler)}>
      <Profile></Profile>
      <FormRight>
        <Title>회원가입</Title>
        <RegisterInput
          {...register("enrolledAt", {
            required: true,
          })}
          placeholder="입학년도 선택 (학번)"
        />
        <RegisterInput
          {...register("university", {
            required: true,
          })}
          type="text"
          placeholder="학교 이름을 검색하세요"
        />
        <RegisterInput
          {...register("email", {
            required: true,
          })}
          type="text"
          placeholder="학교 이메일"
        />
        <RegisterInput
          {...register("emailAgree", {
            required: true,
          })}
          placeholder="인증번호 확인"
        />
        <div>이메일 수신 동의</div>
        <RegisterInput
          {...register("id", {
            required: true,
          })}
          type="text"
          placeholder="아이디"
        />
        <RegisterInput
          {...register("password", {
            required: true,
          })}
          type="password"
          placeholder="비밀번호"
        />
        <RegisterInput
          {...register("password", {
            required: true,
          })}
          type="password"
          placeholder="비밀번호 확인"
        />
        <RegisterInput
          {...register("name", {
            required: true,
          })}
          placeholder="이름"
        />
        <RegisterInput
          {...register("nickname", {
            required: true,
          })}
          placeholder="닉네임"
        />
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
        <RegisterInput
          {...register("birth", {
            required: true,
          })}
          placeholder="휴대전화번호"
        />
        <RegisterInput {...register("profileUrl", {})} />
        <button type="submit">회원가입</button>
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
    </UnivRegisterPage>
  );
};
UnivRegister.getInitialProps = async (ctx) => {
  const pathname = "/register";
  return { pathname };
};

export default UnivRegister;
