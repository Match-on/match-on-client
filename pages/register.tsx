import type { NextPage } from "next";

const Register: NextPage = () => {
  return (
    <>
      <div>register</div>
    </>
  );
};

Register.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;

  return { pathname };
};

export default Register;
