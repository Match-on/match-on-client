import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useAppSelector } from "../../src/hooks/hooks";
import { RootState } from "../../src/redux/store";
import ImageContainer from "../../components/sub/ImageContainer";

const SettingWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 2rem 2rem 2rem;
`;
const Title = styled.div`
  width: 9.6em;
  font-size: 1.5rem;
  font-weight: 400;
  border-left: 0.25rem solid #50d5d5;
  padding-left: 5px;
`;
const SubTitle = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin: 2rem 0 1rem 0;
  color: #aaaaaa;
`;
const ProfileContainer = styled.div`
  width: 100%;
  height: 9.4rem;
  background: #ffffff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  &:hover {
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  }
  cursor: pointer;
  .profile_img {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    margin: 0 3rem;
    img {
      border-radius: 50%;
    }
  }
  .profile_info {
    height: 100%;
    width: calc(100% - 12rem);
    display: flex;
    .info_left {
      width: 70%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .info_title {
        color: #c7c7c7;
        margin-right: 1rem;
      }
    }
    .info_right {
      height: 100%;
      display: flex;
      color: #aaaaaa;
      align-items: center;
    }
  }
`;
const AccountWrapper = styled.div`
  width: 100%;
  height: 30rem;
  background: #ffffff;
  border-radius: 10px;
  margin-bottom: 3rem;
  .account_row {
    width: 100%;
    padding-left: 1rem;
    height: calc(100% / 7);
    font-weight: 400;
    display: flex;
    align-items: center;
    &:hover {
      background: #f9fbfb;
      cursor: pointer;
    }
    .account_title {
      font-size: 0.875rem;
      font-weight: 400;
      width: 9rem;
    }
    .account_content {
      font-size: 0.875rem;
      font-weight: 400;
    }
  }
`;
const profile = () => {
  const user = useAppSelector((state: RootState) => state.user.value);
  return (
    <SettingWrapper>
      <Title>내 프로필</Title>
      <SubTitle>프로필 설정</SubTitle>
      <ProfileContainer>
        <div style={{ margin: "0 3rem" }}>
          <ImageContainer size={[100, 100]} mode="change" imageUrl="" />
        </div>
        <div className="profile_info">
          <div className="info_left">
            <div style={{ margin: "0.5rem" }}>
              <span className="info_title">닉네임</span>
              {user.nickname}
            </div>
            <div style={{ margin: "0.5rem" }}>
              <span className="info_title">소속</span>
              {user.univName}
            </div>
          </div>
          <div className="info_right">{user.email}</div>
        </div>
      </ProfileContainer>
      <SubTitle>계정설정</SubTitle>
      <AccountWrapper>
        <div className="account_row">
          <div className="account_title">이용중인 버전</div>
          <div className="account_content"></div>
        </div>
        <div className="account_row">
          <div className="account_title">아이디</div>{" "}
          <div className="account_content">{user.id}</div>
        </div>
        <div className="account_row">
          <div className="account_title">닉네임</div>{" "}
          <div className="account_content">{user.nickname}</div>
        </div>
        <div className="account_row">
          <div className="account_title">소속 대학</div>
          <div className="account_content">
            {user.univName === null ? "없음" : user.univName}
          </div>
        </div>
        <div className="account_row">
          <div className="account_title">이메일</div>{" "}
          <div className="account_content">{user.email}</div>
        </div>
        <div className="account_row">
          <div className="account_title">전화번호</div>{" "}
          <div className="account_content">{user.phone}</div>
        </div>
        <div className="account_row">
          <div className="account_title">비밀번호</div>{" "}
          <div className="account_content"></div>
        </div>
      </AccountWrapper>
      <SubTitle>계정설정</SubTitle>
    </SettingWrapper>
  );
};

export default profile;
