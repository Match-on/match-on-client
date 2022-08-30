import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppSelector } from "../../src/hooks/hooks";
import { RootState } from "../../src/redux/store";

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
const CommunityWrapper = styled.div`
  width: 100%;
  height: 17rem;
  background: #ffffff;
  border-radius: 10px;
  margin-bottom: 3rem;
  .community_row {
    width: 100%;
    padding-left: 1rem;
    height: 25%;
    font-weight: 400;
    display: flex;
    align-items: center;
    &:hover {
      background: #f9fbfb;
      cursor: pointer;
    }
  }
`;
const ServiceCenter = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  height: 4.25rem;
  padding-left: 1rem;
  line-height: 4.25rem;
  &:hover {
    background: #f9fbfb;
    cursor: pointer;
  }
`;
const ProfileSetting = () => {
  const user = useAppSelector((state: RootState) => state.user.value);
  const router = useRouter();
  return (
    <SettingWrapper>
      <Title>내 프로필</Title>
      <SubTitle>프로필 설정</SubTitle>
      <ProfileContainer onClick={() => router.push("/setting/profile")}>
        <span className="profile_img">
          <Image src={user.profileUrl === null ? "/user.png" : user.profileUrl} width={80} height={80} />
        </span>
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
      <SubTitle>커뮤니티 활동</SubTitle>
      <CommunityWrapper>
        <div className="community_row">내가 쓴 글</div>
        <div className="community_row">댓글 단 글</div>
        <div className="community_row">스크랩</div>
        <div className="community_row">메세지</div>
      </CommunityWrapper>
      <ServiceCenter>고객 센터</ServiceCenter>
    </SettingWrapper>
  );
};

export default ProfileSetting;
