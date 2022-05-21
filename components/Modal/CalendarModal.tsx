import Modal from "react-modal";
import styled from "@emotion/styled";
//1367 645
import Close from "../../public/componentSVG/CloseButton.svg";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

const customStyles = {
  overlay: {
    width: "60%",
    height: "90%",
    top: "5%",
    bottom: "5%",
    left: "20%",
    right: "6%",
    backgroundColor: "white",
    borderRadius: "25px",
  },
  content: {
    border: "none",
    left: "4%", //30px
    right: "4%",
    top: "4%",
    height: "80%",
    overflow: "none",
  },
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4%;
`;

const Title = styled.div`
  font-size: 1.25em;
  font-weight: bold;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const Contents = styled.div`
  width: 100%;
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

const ContetnInput = styled.input`
  width: 100%;
  height: 2rem;
  border: 0.031 solid #aaaaaa;
  border-radius: 0.5rem;
  padding-left: 0.938rem;
  margin-bottom: 1rem;
  ::placeholder,
  ::-webkit-input-placeholder {
  }
  :-ms-input-placeholder {
  }
`;

const CompleteButton = styled.div`
  position: absolute;
  width: 6.625rem;
  height: 2rem;
  background-color: #47d2d2;
  color: white;
  text-align: center;
  right: 0;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const CalendarModal = ({ isOpen, handleOpen }) => {
  const [values, setValues] = useState({
    title: "",
    start: "시작일",
    end: "마감일",
    repeat: "반복",
    color: "Color",
    schedule: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const changeStartDate = (date) => {
    setValues({ ...values, start: date });
    setStartDate(date);
  };
  const changeEndDate = (date) => {
    setValues({ ...values, end: date });
    setEndDate(date);
  };
  return (
    <Modal isOpen={isOpen} onRequesClose={handleOpen} ariaHideApp={false} style={customStyles}>
      <Header>
        <Title onClick={() => console.log(values)}>일정 추가</Title>
        <CloseButton onClick={handleOpen}>
          <Close />
        </CloseButton>
      </Header>
      <Contents>
        <ContetnInput placeholder="제목"></ContetnInput>
        <ContentBox style={{ border: "none" }}>
          <ContentBox style={{ width: "48%" }}>
            <DatePicker dateFormat="yyyy-MM-dd" selected={startDate} onChange={(date) => changeStartDate(date)} />
          </ContentBox>
          <ContentBox style={{ width: "48%" }}>
            <DatePicker dateFormat="yyyy-MM-dd" selected={endDate} onChange={(date) => changeEndDate(date)} />
          </ContentBox>
        </ContentBox>
        <ContentBox style={{ border: "none" }}>
          <ContentBox style={{ width: "48%" }}>{values.repeat}</ContentBox>
          <ContentBox style={{ width: "48%" }}>{values.color}</ContentBox>
        </ContentBox>
        <ContetnInput placeholder="일정을 입력하세요" style={{ height: "18.625rem" }}></ContetnInput>
      </Contents>
      <CompleteButton>완료</CompleteButton>
      {/* {dateOpen && } */}
      {/* setValues({ ...values, start: format(date, "yyyy-mm-dd") }) */}
    </Modal>
  );
};

export default CalendarModal;
