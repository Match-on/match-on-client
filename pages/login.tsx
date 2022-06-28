import React, { useState } from "react";
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
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // "id-login" matches the id for the credential
    const response = await signIn("matchOn-credential", {
      id,
      password,
      redirect: false,
      callbackUrl: "https://localhost:3000/",
    });
    await router.push(response.url);
    console.log("response", response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">Id</label>
        <input id="id" name="id" type="text" placeholder="Id" onChange={(e) => setId(e.target.value)} value={id} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
