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
  height: 90%;
  min-width: 600px;
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
  justify-content: space-around;
  padding: 2%;
`;

const Profile = styled.div`
  width: 20%;
  height: 100%;
  background-color: #aaaaaa;
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
  width: 77%;
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
  font-size: 0.6rem;
  text-align: center;
  border: none;
  cursor: pointer;
  &:hover {
    font-weight: 700;
  }
`;

const Message = styled.span`
  font-size: 0.8rem;
  color: #47d2d2;
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding-left: 1rem;
  border-left: 0.25rem solid #50d5d5;
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
    <RegisterForm onSubmit={handleSubmit(onSubmitHandler)}>
      <Profile></Profile>
      <FormRight>
        <Title>회원가입</Title>
        <div>학교 인증</div>
        <RegisterSelect
          {...register("enrolledAt", {
            required: true,
          })}
          placeholder="입학년도 선택(학번)"
          defaultValue="none"
        >
          <option value="default" disabled hidden>
            Choose your car
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
        <div style={{ display: "flex" }}>
          <input
            {...register("emailAgree", {})}
            type="checkbox"
            placeholder="인증번호 확인"
            style={{ background: "#47d2d2" }}
          />
          <Message>E-mail 수신동의(선택)</Message>
        </div>
        <div>정보 입력</div>
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
        <div>약관 동의</div>
        {/* <RegisterInput {...register("profileUrl", {})} /> */}
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
