import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { NextPage } from "next";

//main
const LogIn = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const LoginForm = styled.form`
  margin: auto;
  width: 35%;
  height: 75%;
  border-radius: 20px;
  box-shadow: 0px 0px 10px #000000;
`;

const LoginText = styled.div`
  font-size: 2rem;
  font-weight: 700;
  width: 100%;
  text-align: center;
  margin: 10% 0 10% 0;
  letter-spacing: 0.05em;
  color: #0acbcb;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 35%;
  justify-content: space-between;
  align-items: center;
`;
//459 50
const LoginInput = styled.input`
  width: 85%;
  height: 22%;
  background: #ffffff;
  border: 0.5px solid #50d5d5;
  border-radius: 10px;
`;

const LoginButton = styled.button`
  width: 85%;
  height: 22%;
  color: white;
  background: #47d2d2;
  border-radius: 10px;
  cursor: pointer;
  border: none;
`;

const Login: NextPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signIn("matchOn-credential", {
      id,
      password,
      redirect: false,
      callbackUrl: "https://localhost:3000/",
    });
    if (response.url) {
      await router.push(response.url);
    } else {
      alert("로그인 실패");
    }
  };

  return (
    <LogIn>
      <LoginForm onSubmit={handleSubmit}>
        <LoginText>Login</LoginText>
        <InputContainer>
          <LoginInput
            id="id"
            name="id"
            type="text"
            placeholder="Id"
            onChange={(e) => setId(e.target.value)}
            value={id}
          />
          <LoginInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <LoginButton type="submit">Login</LoginButton>
        </InputContainer>
      </LoginForm>
    </LogIn>
  );
};

Login.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;

  return { pathname };
};

export default Login;
