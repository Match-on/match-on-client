import React, { useState } from "react";

import Modal from "react-modal";
import styled from "@emotion/styled";
//1367 645
import Close from "../../public/componentSVG/CloseButton.svg";
import CheckCircle from "../../public/myprojectSVG/CheckBox.svg";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

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
  },
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4%;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentBox = styled.div`
  width: 100%;
  height: 4.1%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0.5px solid #aaaaaa;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const ContentInput = styled.input`
  width: 100%;
  height: 10.5%;
  border: 0.5px solid #aaaaaa;
  border-radius: 0.5rem;
  padding-left: 10px;
  margin-bottom: 1rem;
  ::placeholder,
  ::-webkit-input-placeholder {
  }
  :-ms-input-placeholder {
  }
`;

const DateDiv = styled.div`
  width: 15%;
  display: flex;
  color: #d1d1d1;
`;

const IconWrapper = styled.div<{ clicked: boolean }>`
  cursor: pointer;
  svg {
    &:hover {
      fill: #46d2d3;
    }
    fill: ${(props) => (props.clicked ? "#47d2d2" : "#aaaaaa")};
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

const VoteModal = ({ isOpen, handleOpen }) => {
  const [deadline, setDeadline] = useState(new Date());
  const [values, setValues] = useState({
    title: "",
    describe: "",
    item: ["", ""],
    itemNumber: 2,
    deadline: format(deadline, "yyyy-MM-dd h:mm"),
    multipleChoice: false,
    anony: false,
    add: false,
  });

  const InputChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const VoteItemChange = (e: any, index) => {
    setValues({
      ...values,
      [e.target.name]: [...values.item.slice(0, index), e.target.value, ...values.item.slice(index + 1)],
    });
  };
  const AddVoteItem = () => {
    setValues({ ...values, item: values.item.concat("") });
  };

  const ExampleCustomInput = (props: React.HTMLProps<HTMLDivElement>, ref: React.Ref<HTMLInputElement>) => {
    return (
      <div {...props} style={{ width: "100%", height: "100%", fontSize: "100%", color: "#47d2d2" }}>
        {props.value}
      </div>
    );
  };
  return (
    <Modal isOpen={isOpen} onRequesClose={handleOpen} ariaHideApp={false} style={customStyles}>
      <Header>
        <Title onClick={() => console.log(values)}>투표 생성</Title>
        <CloseButton onClick={handleOpen}>
          <Close />
        </CloseButton>
      </Header>
      <Contents>
        <ContentInput name="title" placeholder="제목" style={{ height: "4.2%" }} onChange={InputChange}></ContentInput>
        <ContentInput
          name="describe"
          placeholder="투표에 대한 설명이나 내용을 입력하세요"
          onChange={InputChange}
        ></ContentInput>
        {values.item.map((v, index) => (
          <ContentInput
            name="item"
            placeholder="항목을 입력하세요"
            value={v}
            onChange={(event) => VoteItemChange(event, index)}
            key={`voteItem-${index}`}
          />
        ))}
        <ContentBox style={{ height: "10%" }} onClick={AddVoteItem}>
          + 항목 추가하기
        </ContentBox>
        <ContentBox>
          마감시간 설정
          <DateDiv>
            <DatePicker
              // dateFormat="yyyy-MM-dd"
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              customInput={React.createElement(React.forwardRef(ExampleCustomInput))}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm aa"
              showTimeInput
            />
          </DateDiv>
        </ContentBox>
        <ContentBox>
          복수선택
          <IconWrapper
            clicked={values.multipleChoice}
            onClick={() => setValues({ ...values, multipleChoice: !values.multipleChoice })}
          >
            <CheckCircle />
          </IconWrapper>
        </ContentBox>
        <ContentBox>
          익명투표
          <IconWrapper clicked={values.anony} onClick={() => setValues({ ...values, anony: !values.anony })}>
            <CheckCircle />
          </IconWrapper>
        </ContentBox>
        <ContentBox>
          선택 항목 추가 허용
          <IconWrapper clicked={values.add} onClick={() => setValues({ ...values, add: !values.add })}>
            <CheckCircle />
          </IconWrapper>
        </ContentBox>
      </Contents>
      <CompleteButton onClick={handleOpen}>완료</CompleteButton>
    </Modal>
  );
};

export default VoteModal;
