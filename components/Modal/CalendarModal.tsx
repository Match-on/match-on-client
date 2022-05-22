import Modal from "react-modal";
import styled from "@emotion/styled";
//1367 645
import Close from "../../public/componentSVG/CloseButton.svg";
import React, { useState } from "react";
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

const ColorContainer = styled.div`
  width: 9.1rem;
  height: 9.1rem;
  display: flex;
  flex-wrap: wrap;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25));
  background-color: white;
  border-radius: 0.625rem;
  border: 1px solid black;
`;

const RepeatOptions = ["없음", "매일", "매주", "매달", "매년"];
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

const CalendarModal = ({ isOpen, handleOpen }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [colorClick, setColorClick] = useState(false);
  const [values, setValues] = useState({
    title: "",
    start: format(startDate, "yyyy-MM-dd"),
    end: format(endDate, "yyyy-MM-dd"),
    repeat: "반복",
    color: "#1a1a1a",
    schedule: "",
  });

  const changeStartDate = (date) => {
    setValues({ ...values, start: format(date, "yyyy-MM-dd") });
    setStartDate(date);
  };
  const changeEndDate = (date) => {
    setValues({ ...values, end: format(date, "yyyy-MM-dd") });
    setEndDate(date);
  };
  const changeRepeat = (e) => {
    setValues({ ...values, repeat: e.target.value });
  };

  // const ExampleCustomInput = ({
  //   value,
  //   onClick,
  // }: {
  //   value: string;
  //   onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  // }) => (
  //   <div onClick={onClick} style={{ width: "100%", height: "100%", fontSize: "0.75rem" }}>
  //     {value}
  //   </div>
  // );

  const ExampleCustomInput = (props: React.HTMLProps<HTMLDivElement>, ref: React.Ref<HTMLInputElement>) => {
    return (
      <div {...props} style={{ width: "100%", height: "100%", fontSize: "100%", color: "#47d2d2" }}>
        {props.value}
      </div>
    );
  };
  const ColorCircle = ({ color }) => {
    return (
      <div
        onClick={() => setValues({ ...values, color: color })}
        style={{ width: "1.4rem", height: "1.4rem", borderRadius: "50%", cursor: "pointer", backgroundColor: color }}
      ></div>
    );
  };
  const ColorBox = () => {
    return (
      <ColorContainer>
        {ColorOptions.map((item, v) => (
          <ColorCircle color={item} key={item} />
        ))}
      </ColorContainer>
    );
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
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={startDate}
              onChange={(date) => changeStartDate(date)}
              customInput={React.createElement(React.forwardRef(ExampleCustomInput))}
            />
          </ContentBox>
          <ContentBox style={{ width: "48%" }}>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={endDate}
              onChange={(date) => changeEndDate(date)}
              customInput={React.createElement(React.forwardRef(ExampleCustomInput))}
            />
          </ContentBox>
        </ContentBox>
        <ContentBox style={{ border: "none" }}>
          <ContentBox style={{ width: "48%" }}>
            {values.repeat}
            <select onChange={changeRepeat}>
              {RepeatOptions.map((item, i) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </ContentBox>
          <ContentBox style={{ width: "48%" }} onClick={() => setColorClick(!colorClick)}>
            <ColorCircle color={values.color} />
            {colorClick && <ColorBox />}
          </ContentBox>
        </ContentBox>
        <ContetnInput placeholder="일정을 입력하세요" style={{ height: "18.625rem" }}></ContetnInput>
      </Contents>
      <CompleteButton onClick={handleOpen}>완료</CompleteButton>
    </Modal>
  );
};

export default CalendarModal;
