import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const router = useRouter();
  const login = async (e: any) => {
    e.preventDefault();
    // Form 안에서 이메일, 패스워드 가져오기
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response: any = await signIn("email-password-credential", {
      email,
      password,
      redirect: false,
      callbackUrl: "http://localhost:3000/home",
    });
    await router.push(response.url);
    console.log(response);
  };
  return (
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
  );
};

export default Login;
