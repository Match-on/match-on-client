import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { userLogin } from "../src/redux/reducers/user";
import { AppDispatch } from "../src/redux/store";
import { useAppDispatch } from "../src/hooks/hooks";
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

const LoginForm = styled.div`
  margin: auto;
  width: 34em;
  height: 41.25em;
  border: 1px solid black;
  border-radius: 30px;
`;

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const login = async (e: any) => {
    e.preventDefault();
    // Form 안에서 이메일, 패스워드 가져오기
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response: any = await signIn("matchOn-credential", {
      email,
      password,
      redirect: false,
      callbackUrl: "http://localhost:3000/home",
    });
    console.log("response", response);
    if (response.url) {
      await router.push(response.url);
    } else {
      alert("로그인에 실패하였습니다.");
    }
  };

  return (
    <LogIn>
      <LoginForm>
        <form onSubmit={login}>
          <label>
            이메일:
            <input type="email" name="email" placeholder="type your email" />
          </label>
          <label>
            비밀번호:
            <input type="password" name="password" />
          </label>
          <button type="submit">로그인</button>
        </form>
      </LoginForm>
    </LogIn>
  );
};

export default Login;
