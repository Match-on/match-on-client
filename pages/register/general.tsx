import React from "react";

const GenRegister = () => {
  return (
    <div>
      일반회원등록<div></div>
    </div>
  );
};
GenRegister.getInitialProps = async (ctx) => {
  const pathname = "/register";
  return { pathname };
};

export default GenRegister;
