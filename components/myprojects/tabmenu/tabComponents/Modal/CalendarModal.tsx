import Modal from "react-modal";
import styled from "@emotion/styled";
//1367 645
import Close from "../../../../../public/componentSVG/CloseButton.svg";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
//import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import DateSelect from "../../../../sub/Datepicker/DateSelect";
import EditorForm from "../../../../sub/Editor";
import axios from "axios";
import { API_URL } from "../../../../api/API";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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

  .modal_bottom {
    display: flex;
    justify-content: flex-end;
  }
  padding: 5%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 3rem;
`;

const Title = styled.div`
  font-size: 1em;
  font-weight: 550;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const Contents = styled.div`
  width: 100%;
  height: calc(100% - 3rem);
  display: flex;
  flex-direction: column;
  font-size: 1rem;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  width: 100%;
  height: 2rem;
  border: 0.031rem solid #aaaaaa;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;
const DateBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 7px 0 12px;
  .date_text {
    font-size: 0.75rem;
    color: #d1d1d1;
  }
`;
const ColorRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  width: 100%;
  height: 2rem;
  border: 0.031rem solid #aaaaaa;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  padding: 0 12px;
  .color_text {
    font-size: 0.75rem;
    color: #d1d1d1;
  }
`;
const CircelContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  border: 0.2px solid #c4c4c4;
  &:hover {
    border: 3px solid #627dff;
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const ContentInput = styled.input`
  width: 100%;
  height: 2rem;
  border: 0.031 solid #aaaaaa;
  border-radius: 0.5rem;
  padding-left: 0.938rem;
  margin-bottom: 1rem;
  border: 0.5px solid #aaaaaa;
  &:focus {
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    outline: none;
    font-size: 0.75rem;
    color: #d1d1d1;
  }
  :-ms-input-placeholder {
  }
`;

const CompleteButton = styled.div<{ isPossible: boolean }>`
  width: 6.625rem;
  height: 2rem;
  background-color: ${(props) => (props.isPossible ? "#47d2d2" : "#c4c4c4")};
  color: white;
  text-align: center;
  right: 0;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const ColorContainer = styled.div`
  position: absolute;
  width: 9.3rem;
  height: 9.3rem;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  margin-left: -6.8rem;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25));
  background-color: white;
  border-radius: 0.625rem;
  .color_box {
    width: 25%;
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ColorOptions = [
  "#ffffff",
  "#fef445",
  "#fac712",
  "#f34725",
  "#e6e6e6",
  "#cee741",
  "#8ed14f",
  "#da0063",
  "#808080",
  "#14cdd4",
  "#0ca888",
  "#9610ac",
  "#1a1a1a",
  "#2d9bf0",
  "#414bb2",
  "#652cb3",
];

const CalendarModal = ({ isOpen, handleOpen, isPatch }) => {
  const { data: session, status } = useSession();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [colorClick, setColorClick] = useState(false);
  const [body, setBody] = useState<string>("");
  const [values, setValues] = useState({
    title: "",
    color: "#1a1a1a",
  });
  const router = useRouter();
  const { projectIdx } = router.query;

  const changeStartDate = (date) => {
    setStartDate(date);
  };
  const changeEndDate = (date) => {
    setEndDate(date);
  };
  const postSchedule = async () => {
    try {
      const res = await axios.post(
        API_URL + `teams/${projectIdx}/schedules`,
        {
          title: values.title,
          body: body,
          color: values.color,
          startTime: startDate,
          endTime: endDate,
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

  const ExampleCustomInput = (
    props: React.HTMLProps<HTMLDivElement>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div
        {...props}
        style={{
          width: "120px",
          height: "100%",
          color: "#47d2d2",
          marginLeft: "calc(100% - 120px)",
        }}
      >
        {props.value}
      </div>
    );
  };
  const ColorCircle = ({ color }) => {
    return (
      <CircelContainer
        onClick={() => setValues({ ...values, color: color })}
        style={{
          backgroundColor: color,
        }}
      ></CircelContainer>
    );
  };
  const ColorBox = () => {
    return (
      <ColorContainer>
        {ColorOptions.map((item, v) => (
          <div className="color_box" key={item}>
            <ColorCircle color={item} />
          </div>
        ))}
      </ColorContainer>
    );
  };
  function isPostPossible() {
    if (values.title.length > 0 && body.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    console.log(values);
    console.log(startDate);
  }, [values, startDate]);
  return (
    <StyledModal
      isOpen={isOpen}
      onRequesClose={handleOpen}
      ariaHideApp={false}
      style={customStyles}
    >
      <Header>
        <Title onClick={() => console.log(values)}>일정 추가</Title>
        <CloseButton onClick={handleOpen}>
          <Close />
        </CloseButton>
      </Header>
      <Contents>
        <ContentInput
          placeholder="제목"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
        />
        <ContentBox style={{ padding: "5px 0" }}>
          <DateBox style={{ borderRight: "0.2px solid #dcdcdc" }}>
            <div className="date_text">시작일</div>
            <DateSelect value={startDate} handleValue={changeStartDate} />
          </DateBox>
          <DateBox>
            <div className="date_text">마감일</div>
            <DateSelect value={endDate} handleValue={changeEndDate} />
          </DateBox>
        </ContentBox>
        <ColorRow onClick={() => setColorClick(!colorClick)}>
          <div className="color_text">Color</div>
          <div>
            <ColorCircle color={values.color} />
            {colorClick && <ColorBox />}
          </div>
        </ColorRow>
        <div style={{ width: "100%", height: "calc(100% - 9rem)" }}>
          <EditorForm
            setBody={setBody}
            data={""}
            clickable={!colorClick}
            placeholder="일정을 입력하세요."
          />
        </div>
      </Contents>
      <div className="modal_bottom">
        <CompleteButton
          onClick={isPostPossible() ? postSchedule : undefined}
          isPossible={isPostPossible()}
        >
          완료
        </CompleteButton>
      </div>
    </StyledModal>
  );
};

export default CalendarModal;
