import Modal from "react-modal";
import styled from "@emotion/styled";
//1367 645
import Close from "../../../../../public/componentSVG/CloseButton.svg";
import EditorForm from "../../../../sub/Editor";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { API_URL } from "../../../../api/API";
import MeetEditor from "../../../../sub/MeetEditor";
import DateSelect from "../../../../sub/Datepicker/DateSelect";

interface Todo {
  isOpen: boolean;
  member: { name: string; idx: number };
  todo: string;
  date: Date;
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
  border: 1px solid #f1f1f1;
  border-radius: 1.5rem;
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
  height: 2.3rem;
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
const MemberTodo = styled.div`
  width: 100%;
  height: 3rem;
  color: #ababab;
  font-size: 0.875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
`;
const SelectWrapper = styled.div`
  color: #ababab;
  font-size: 0.875rem;
`;
const SelectTitle = styled.div`
  width: 6rem;
  height: 2.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 1px solid #f1f1f1;
  border-radius: 8px;
  padding-left: 3px;
  > span {
    cursor: default;
    text-align: center;
  }
`;
const SelectOption = styled.ul`
  position: absolute;
  width: 6rem;
  border-radius: 0.625rem;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  > li {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 2rem;
    font-size: 0.75rem;
    padding: 5%;
    cursor: pointer;
    &:hover {
      color: #47d2d2;
      > svg {
        fill: #47d2d2;
      }
    }
  }
`;
const TodoInput = styled.input`
  width: calc(100% - 14rem);
  height: 2.3rem;
  border-radius: 8px;
  padding-left: 10px;
  border: 1px solid #f1f1f1;
  &:focus {
    outline: none;
  }
`;
const AppendButton = styled.div`
  width: 100%;
  height: 2.3rem;
  border: 1px solid #f1f1f1;
  border-radius: 8px;
  text-align: center;
  line-height: 2.3rem;
  font-size: 1.5rem;
  &:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;
interface MemberInformation {
  memberIdx: number;
  name: string;
  role: string;
  status: string;
}
type Props = {
  isOpen: boolean;
  handleOpen: () => void;
  projectIdx: string | string[];
  member: MemberInformation[];
};
const NoteModal = ({ isOpen, handleOpen, projectIdx, member }: Props) => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState([]);
  const [todo, setTodo] = useState<Todo[]>([
    {
      isOpen: false,
      member: { name: "", idx: null },
      todo: "",
      date: new Date(),
    },
    {
      isOpen: false,
      member: { name: "", idx: null },
      todo: "",
      date: new Date(),
    },
  ]);
  useEffect(() => {
    console.log();
  }, [todo]);
  const AssignMember = ({ idx }) => {
    const openSelect = () => {
      setTodo([
        ...todo.slice(0, idx),
        {
          ...todo[idx],
          isOpen: !todo[idx].isOpen,
        },
        ...todo.slice(idx + 1, todo.length),
      ]);
    };
    const selectMember = (name, memberIdx) => {
      todo[idx].member.name = name;
      todo[idx].member.idx = memberIdx;
      openSelect();
    };
    return (
      <SelectWrapper>
        <SelectTitle onClick={openSelect}>
          {todo[idx].member.name === "" ? (
            <span>팀원 지정</span>
          ) : (
            <span>{todo[idx].member.name}</span>
          )}
        </SelectTitle>
        {todo[idx].isOpen && (
          <SelectOption>
            {member.map((mem, i) => (
              <li
                key={`member-${i}`}
                value={mem.memberIdx}
                onClick={() => selectMember(mem.name, mem.memberIdx)}
              >
                {mem.name}
              </li>
            ))}
          </SelectOption>
        )}
      </SelectWrapper>
    );
  };
  const appendTodo = () => {
    setTodo([
      ...todo,
      {
        isOpen: false,
        member: { name: "", idx: null },
        todo: "",
        date: new Date(),
      },
    ]);
  };
  const isPossible = () => {
    return title.length > 0;
  };
  const postMeetingLog = async () => {
    try {
      const res = await axios.post(
        API_URL + `teams/${projectIdx}/notes`,
        {
          title: title,
          body: description,
          files: [{ fileName: "sh.jpg", url: "https://sh" }],
          tasks: todo.map((v, i) => {
            const obj = {};
            (obj["memberIdx"] = v.member.idx), (obj["description"] = v.todo);
            return obj;
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      console.log(res);

      handleOpen();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequesClose={handleOpen}
      ariaHideApp={false}
      style={customStyles}
    >
      <Header>
        <Title>회의록 업로드</Title>
        <CloseButton onClick={handleOpen}>
          <Close />
        </CloseButton>
      </Header>
      <Contents>
        <ContentInput
          placeholder="제목"
          onChange={(e) => setTitle(e.target.value)}
        />
        <MeetEditor
          setBody={setDescription}
          data={""}
          clickable={true}
          placeholder={"글을 입력하세요."}
        />
        {todo.map((v, idx) => {
          return (
            <MemberTodo key={idx}>
              <AssignMember idx={idx} />
              <TodoInput
                type={"text"}
                placeholder="할 일을 적어주세요."
                onChange={(e) =>
                  setTodo([
                    ...todo.slice(0, idx),
                    {
                      ...todo[idx],
                      todo: e.target.value,
                    },
                    ...todo.slice(idx + 1, todo.length),
                  ])
                }
              />
              <SelectTitle>
                <DateSelect
                  value={todo[idx].date}
                  handleValue={(date) =>
                    setTodo([
                      ...todo.slice(0, idx),
                      {
                        ...todo[idx],
                        date: date,
                      },
                      ...todo.slice(idx + 1, todo.length),
                    ])
                  }
                  time="no"
                />
              </SelectTitle>
            </MemberTodo>
          );
        })}
        <AppendButton onClick={appendTodo}>+</AppendButton>
      </Contents>
      <div className="bottom">
        <UploadButton
          possible={isPossible()}
          onClick={isPossible() ? postMeetingLog : undefined}
        >
          등록
        </UploadButton>
      </div>
    </StyledModal>
  );
};

export default NoteModal;
