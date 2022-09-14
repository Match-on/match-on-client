import Modal from "react-modal";
import styled from "@emotion/styled";
//1367 645
import Close from "../../../../../public/componentSVG/CloseButton.svg";
import EditorForm from "../../../../sub/Editor";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import CustomCheck from "../../../../../public/componentSVG/register/CustomCheck.svg";
import { API_URL } from "../../../../api/API";
import DateSelect from "../../../../sub/Datepicker/DateSelect";
import { format } from "date-fns";

interface VoteChoice {
  description: string;
  imageUrl: string;
}

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
    justifyContent: "space-between",
    overflowY: "scroll",
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
    justify-content: flex-end;
  }
  padding: 5%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 7%;
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
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
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
  height: 2rem;
  border: 0.5px solid #aaaaaa;
  border-radius: 8px;
  padding-left: 10px;
  margin-bottom: 2%;
  border: 1px solid #f1f1f1;
  &:focus {
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
  }
  :-ms-input-placeholder {
  }
`;
const VoteWrapper = styled.div<{ plus?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  border-radius: 8px;
  margin-bottom: 10px;
  padding-left: 10px;
  border: 1px solid #f1f1f1;
  font-size: 0.75rem;
  font-weight: 500;
  &:hover {
    background: ${(props) => props.plus && "#f1f7f7"};
    cursor: pointer;
  }
  > svg {
    cursor: pointer;
  }
`;
const VoteInput = styled.input`
  width: 80%;
  height: 3rem;
  border-radius: 8px;
  border: none;
  &:focus {
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 0.75rem;
  }
  :-ms-input-placeholder {
  }
`;
const VoteSetting = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2rem;
  border: 0.5px solid #f1f1f1;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 0.75rem;
`;

const VoteModal = ({ isOpen, handleOpen, projectIdx }) => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [voteChoices, setVoteChoices] = useState<VoteChoice[]>([
    { description: "", imageUrl: "" },
    { description: "", imageUrl: "" },
  ]);
  const [voteSetting, setVoteSetting] = useState({
    // endTime: format(new Date(), "yyyy-MM-dd"),
    endTime: new Date(),
    isMultiple: false,
    isAnonymous: false,
    isAddable: false,
  });
  const appendChoices = () => {
    setVoteChoices((prev) => [...prev, { description: "", imageUrl: "" }]);
  };
  const handleVoteInput = (e, idx) => {
    setVoteChoices((prev) => [
      ...voteChoices.slice(0, idx),
      { description: e.target.value, imageUrl: voteChoices[idx].imageUrl },
      ...voteChoices.slice(idx + 1, voteChoices.length),
    ]);
    // voteChoices[idx] = { description: e.target.value, imageUrl: voteChoices[idx].imageUrl };
  };
  //   const handleVoteImg = (idx) => {};
  const handleVoteSetting = (element) => {
    if (element === "isMultiple") {
      setVoteSetting((prev) => {
        return {
          ...prev,
          isMultiple: !voteSetting[element],
        };
      });
    }
    if (element === "isAnonymous") {
      setVoteSetting((prev) => {
        return {
          ...prev,
          isAnonymous: !voteSetting[element],
        };
      });
    }
    if (element === "isAddable") {
      setVoteSetting((prev) => {
        return {
          ...prev,
          isAddable: !voteSetting[element],
        };
      });
    }
  };
  const handleDate = (date) => {
    setVoteSetting((prev) => {
      return {
        ...prev,
        endTime: date,
      };
    });
  };

  const isPossible = () => {
    let possible = true;
    voteChoices.forEach((el, i) => {
      if (el.description.length === 0) {
        possible = false;
      }
    });
    if (title.length === 0) {
      possible = false;
    }
    return possible;
  };
  const postVote = async () => {
    try {
      const res = await axios.post(
        API_URL + `teams/${projectIdx}/votes`,
        {
          title: title,
          description: description,
          endTime: format(voteSetting.endTime, "yyyy-MM-dd HH:mm:00"),
          isMultiple: voteSetting.isMultiple,
          isAnonymous: voteSetting.isAnonymous,
          isAddable: voteSetting.isAnonymous,
          choices: voteChoices,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      handleOpen();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledModal isOpen={isOpen} onRequesClose={handleOpen} ariaHideApp={false} style={customStyles}>
      <Header>
        <Title>투표 생성</Title>
        <CloseButton onClick={handleOpen}>
          <Close />
        </CloseButton>
      </Header>
      <Contents>
        <ContentInput placeholder="제목" onChange={(e) => setTitle(e.target.value)} />
        {/* <ContentInput
          style={{ height: "4rem" }}
          placeholder="투표에 대한 설명이나 내용을 입력하세요."
          onChange={(e) => setDescription(e.target.value)}
        /> */}
        <div style={{ height: "6rem" }}>
          <EditorForm
            setBody={setDescription}
            data={""}
            clickable={true}
            placeholder="투표에 대한 설명이나 내용을 입력하세요."
          />
        </div>
        {voteChoices.map((vote, idx) => (
          <VoteWrapper key={idx}>
            <VoteInput placeholder={`${idx + 1}번 항목을 입력하세요.`} onChange={(e) => handleVoteInput(e, idx)} />
          </VoteWrapper>
        ))}
        <VoteWrapper plus={true} onClick={appendChoices}>
          + 항목 추가하기
        </VoteWrapper>
        <VoteSetting>
          <span>마감시간 설정</span>
          <DateSelect value={voteSetting.endTime} handleValue={handleDate} />
        </VoteSetting>
        <VoteSetting>
          <span>복수 선택</span>
          <CustomCheck
            fill={voteSetting.isMultiple ? "#47d2d2" : "#aaaaaa"}
            onClick={() => handleVoteSetting("isMultiple")}
          />
        </VoteSetting>
        <VoteSetting>
          <span>익명 투표</span>
          <CustomCheck
            fill={voteSetting.isAnonymous ? "#47d2d2" : "#aaaaaa"}
            onClick={() => handleVoteSetting("isAnonymous")}
          />
        </VoteSetting>
        <VoteSetting>
          <span>선택항목 추가 허용</span>
          <CustomCheck
            fill={voteSetting.isAddable ? "#47d2d2" : "#aaaaaa"}
            onClick={() => handleVoteSetting("isAddable")}
          />
        </VoteSetting>
      </Contents>
      <div className="bottom">
        <UploadButton possible={isPossible()} onClick={isPossible() ? postVote : undefined}>
          등록
        </UploadButton>
      </div>
    </StyledModal>
  );
};

export default VoteModal;
