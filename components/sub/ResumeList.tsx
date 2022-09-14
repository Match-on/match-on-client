import styled from "@emotion/styled";
import { useState } from "react";
import CustomCheck from "../../public/componentSVG/register/CustomCheck.svg";
import TeamCreateModal from "./TeamCreateModal";
interface ResumeUser {
  userIdx: number;
  nickname: string;
  profileUrl: string | null;
}
interface Resume {
  body: string;
  user: ResumeUser;
}
interface ResumeProps {
  resumeList: Resume[] | null;
  type: string;
  index: number;
}

const ListContainer = styled.div`
  width: 30%;
  height: 95%;
  border-radius: 0.625rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  .title {
    width: 100%;
    height: 3.5rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-weight: 500;
  }
  .list_count {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background: #47d2d2;
    color: #ffffff;
    text-align: center;
    line-height: 1rem;
    font-size: 0.65rem;
    margin-left: 0.5rem;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const ButtonWrapper = styled.div<{ creating?: boolean }>`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: ${(props) => (props.creating ? "space-between" : "flex-end")};
  align-items: center;
  padding: 1rem;
  .create_button {
    width: 7rem;
    height: 2.5rem;
    font-size: 1rem;
    border-radius: 0.625rem;
    background: #47d2d2;
    text-align: center;
    line-height: 2.5rem;
    color: #ffffff;
    cursor: pointer;
  }
  .back {
    font-size: 0.5rem;
    color: #47d2d2;
    cursor: pointer;
    &:hover {
      font-weight: 600;
    }
  }
`;
const ResumeContainer = styled.div`
  width: 100%;
  height: calc(100% - 8.5rem);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;
const ListRow = styled.div`
  width: 100%;
  min-height: 4rem;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-top: 0.25px solid #dcdcdc;
  border-bottom: 0.25px solid #dcdcdc;
  cursor: pointer;
  &:hover {
    background: rgba(242, 246, 246, 0.5);
    border-left: 5px solid #50d5d5;
  }
`;
const CreateRow = styled.div`
  width: 100%;
  min-height: 4rem;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-top: 0.25px solid #dcdcdc;
  border-bottom: 0.25px solid #dcdcdc;
  cursor: pointer;
  &:hover {
    background: rgba(242, 246, 246, 0.5);
  }
`;
const Profile = styled.div`
  height: 2.5rem;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
`;
const RowBody = styled.div`
  font-size: 0.75rem;
`;

const ResumeList = (props: ResumeProps) => {
  console.log("list props", props);
  const [teamMember, setTeamMember] = useState<number[]>([]);
  const [teamCreating, setTeamCreating] = useState<boolean>(false);
  const [memeberSelecting, setMemberSelecting] = useState<boolean>(false);
  const isExisting = (userIdx: number) => {
    return teamMember.some((x) => x === userIdx);
  };
  const addTeamMember = (userIdx: number) => {
    if (isExisting(userIdx)) {
      setTeamMember(teamMember.filter((idx) => idx !== userIdx));
    } else {
      setTeamMember([...teamMember, userIdx]);
    }
  };
  return (
    <ListContainer>
      <div className="title">
        지원서 리스트<div className="list_count">{props.resumeList.length}</div>
      </div>
      {memeberSelecting ? (
        <ResumeContainer>
          {props.resumeList.map((v, idx) => (
            <CreateRow
              key={idx}
              onClick={() => {
                addTeamMember(v.user.userIdx);
              }}
            >
              <CustomCheck
                fill={isExisting(v.user.userIdx) ? "#47d2d2" : "#c4c4c4"}
                style={{ width: "20px", height: "20px", marginRight: "1rem" }}
              />
              <Profile>{v.user.nickname}</Profile>
            </CreateRow>
          ))}
        </ResumeContainer>
      ) : (
        <ResumeContainer>
          {props.resumeList.map((v, idx) => (
            <ListRow key={idx}>
              <Profile>{v.user.nickname}</Profile>
              <RowBody dangerouslySetInnerHTML={{ __html: v.body }} />
            </ListRow>
          ))}
        </ResumeContainer>
      )}
      <ButtonWrapper creating={memeberSelecting}>
        {memeberSelecting ? (
          <>
            <span className="back" onClick={() => setMemberSelecting(false)}>
              뒤로가기
            </span>
            <div className="create_button" onClick={() => setTeamCreating(true)}>
              확인
            </div>
          </>
        ) : (
          <div className="create_button" onClick={() => setMemberSelecting(true)}>
            팀 생성
          </div>
        )}
      </ButtonWrapper>
      {teamCreating && (
        <TeamCreateModal
          isOpen={teamCreating}
          handleOpen={() => setTeamCreating((prev) => !prev)}
          member={teamMember}
          type={props.type}
          index={props.index}
        />
      )}
    </ListContainer>
  );
};

export default ResumeList;
