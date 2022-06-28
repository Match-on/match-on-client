import styled from "@emotion/styled";

const SignUpPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const MemberContainer = styled.div`
  width: 25.2%;
  height: 59%;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px #000000;
  border-radius: 20px;
`;

const SignUpButton = styled.div`
  width: 78%;
  height: 10%;
  background-color: #47d2d2;
  border-radius: 10px;
`;

const SignUp = () => {
  return (
    <SignUpPage>
      <MemberContainer>
        대학생 회원
        <SignUpButton>회원가입</SignUpButton>
      </MemberContainer>
      <MemberContainer>
        일반 회원<SignUpButton>회원가입</SignUpButton>
      </MemberContainer>
    </SignUpPage>
  );
};

export default SignUp;
