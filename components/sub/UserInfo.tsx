import React from "react";

type UserInformation = {
  name: string;
};

const UserInfo: React.FC<UserInformation> = ({ name }) => {
  return <div>{name}</div>;
};

export default UserInfo;
