import Modal from "react-modal";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
//1367 645
import Close from "../../public/componentSVG/CloseButton.svg";
import axios from "axios";
import { API_URL } from "../api/API";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import CustomCheck from "../../../../public/componentSVG/register/CustomCheck.svg";
import { useRouter } from "next/router";

const customStyles = {
  overlay: {
    width: "60%",
    height: "90%",
    top: "5%",
    bottom: "5%",
    left: "20%",
    right: "6%",
    backgroundColor: "white",
    borderRadius: "1.5rem",
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "spacebetween",
  },
};

const StyledModal = styled(Modal)`
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  .bottom {
    display: flex;
    height: 4rem;
    justify-content: flex-end;
    align-items: flex-end;
  }
  padding: 5%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10%;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const Contents = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UploadButton = styled.div<{ possible: boolean }>`
  width: 7rem;
  height: 2rem;
  background: ${(props) => (props.possible ? "#47d2d2" : "#aaaaaa")};
  border-radius: 0.5rem;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.possible ? "pointer" : "arrow")};
`;

const ContentInput = styled.input`
  width: 100%;
  height: 2.3rem;
  border: 0.5px solid #aaaaaa;
  border-radius: 8px;
  padding-left: 10px;
  margin-bottom: 2%;
  border: 1px solid #f1f1f1;
  &:focus {
    outline: 2px solid #47d2d2;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
  }
  :-ms-input-placeholder {
  }
`;
const ContentsRow = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .row_title {
    font-size: 0.75rem;
    color: #aaaaaa;
  }
  .input_wrapper {
    display: flex;
    justify-content: space-between;
  }
`;
const MemberWrapper = styled.div`
  width: 100%;
  height: 65%;
  border: 1px solid black;
`;

const TeamCreateModal = ({ isOpen, handleOpen, member, type }) => {
  const { data: session, status } = useSession();
  const [teamName, setTeamName] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const router = useRouter();

  const createTeam = async () => {
    try {
      const res = await axios.post(
        API_URL + `teams`,
        {
          name: teamName,
          type: "스터디",
          members: member,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      if (res.data.code === 1000) {
        router.push("/myproject");
      } else {
        alert("팀 생성에 실패하였습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledModal isOpen={isOpen} onRequesClose={handleOpen} ariaHideApp={false} style={customStyles}>
      <Header>
        <Title>팀 생성</Title>
        <CloseButton onClick={handleOpen}>
          <Close />
        </CloseButton>
      </Header>
      <Contents>
        <ContentsRow>
          <ContentInput
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="팀 이름을 입력하세요. (추후 변경 가능)"
          />
        </ContentsRow>
        <ContentsRow>
          <span className="row_title">사용자 초대하기</span>
          <div className="input_wrapper">
            <ContentInput style={{ width: "calc(100% - 6rem)" }} placeholder="사용자 이메일 입력"></ContentInput>
            <UploadButton style={{ width: "5rem", height: "2.3rem" }} possible={true}>
              등록
            </UploadButton>
          </div>
        </ContentsRow>
        <MemberWrapper>
          {member.map((userIdx, idx) => (
            <div key={idx}>{userIdx}</div>
          ))}
        </MemberWrapper>
      </Contents>
      <div className="bottom">
        <UploadButton onClick={createTeam} possible={teamName.length > 0}>
          등록
        </UploadButton>
      </div>
    </StyledModal>
  );
};

export default TeamCreateModal;
