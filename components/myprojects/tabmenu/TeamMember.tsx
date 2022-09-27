import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { API_URL } from "../../api/API";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import MenuIcon from "../../../public/componentSVG/Menu.svg";
import ImageContainer from "../../sub/ProfileImage";
interface MemoProps {
  memoIdx: number;
  memo: string;
}
interface MemberProps {
  memberIdx: number;
  name: string;
  profileUrl: string | null;
  detail: string;
  memos: MemoProps[];
  isMe: string;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25%, 250px));
  grid-auto-rows: 300px;
  justify-content: space-evenly;
  /* align-content: space-between; */
  /* grid-template-rows: 1fr 1fr 1fr 1fr; */
  background-color: #ffffff;
  overflow-y: scroll;
  padding: 15px;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(50%, auto));
  }
  @media (max-width: 496px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, auto));
  }
  @media (min-width: 2500px) {
    grid-auto-rows: 700px;
  }
`;

const MemberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MemberBox = styled.div`
  width: 17rem;
  height: 16.5rem;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 15px;
  .upper_section {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 45%;
    border-bottom: 0.5px solid #dcdcdc;
    .menu_section {
      width: 100%;
      height: 10%;
      display: flex;
      justify-content: flex-end;
    }
    .profile_img {
      height: 90%;
      width: 40%;
    }
    .member_info {
      height: 90%;
      width: 60%;
      .member_name {
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 1rem;
      }
      .member_detail {
        font-size: 0.75rem;
        color: #a0a0a0;
      }
    }
  }
  .bottom_section {
    width: 100%;
    height: 55%;
    padding: 10px 0 0 0;
    .memo_section {
      width: 100%;
      height: 100%;
      background: #f2f6f6;
      border-radius: 10px;
      padding: 10px;
      .memo_content {
        width: 100%;
        font-size: 0.75rem;
        color: #a0a0a0;
        margin-bottom: 0.5rem;
      }
    }
  }
`;

const AddContainer = styled.div`
  width: 16.8rem;
  height: 16.5rem;
  display: flex;
  font-size: 4rem;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 1.25rem;
  align-items: center;
  justify-content: center;
  color: #aaaaaa;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 1em rgba(0, 0, 0, 0.25);
  }
`;

const TeamMember = (props) => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const { projectIdx } = router.query;

  const [teamMember, setTeamMember] = useState<MemberProps[]>([]);

  const getTeamMember = async () => {
    const res = await axios.get(API_URL + `teams/${projectIdx}/members`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    setTeamMember(res.data.result);
  };
  useEffect(() => {
    getTeamMember();
    console.log(teamMember);
  }, []);
  return (
    <Container>
      {teamMember.map((member, idx) => (
        <MemberContainer key={idx}>
          <MemberBox>
            <div className="upper_section">
              <div className="menu_section">
                {member.isMe === "1" && (
                  <MenuIcon style={{ cursor: "pointer" }} />
                )}
              </div>
              <div className="profile_img">
                <ImageContainer
                  size={[50, 50]}
                  imageUrl={member.profileUrl === null ? "" : member.profileUrl}
                />
              </div>
              <div className="member_info">
                <div className="member_name">{member.name}</div>
                <div className="member_detail">dfsd{member.detail}</div>
              </div>
            </div>
            <div className="bottom_section">
              <div className="memo_section">
                {member.memos.map((memo, idx) => (
                  <div className="memo_content" key={`memo-${idx}`}>
                    ● {memo.memo}
                  </div>
                ))}
              </div>
            </div>
          </MemberBox>
        </MemberContainer>
      ))}
      <MemberContainer>
        <AddContainer>+</AddContainer>
      </MemberContainer>
    </Container>
  );
};

export default TeamMember;
