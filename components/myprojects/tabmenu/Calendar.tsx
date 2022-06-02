import React, { useState } from "react";
import styled from "@emotion/styled";
import { format } from "date-fns";
import Calendar from "react-calendar";
import CalendarModal from "../../TabContents/Input/CalendarInputModal";
//1367 645
const Container = styled.div`
  width: 100%;
  height: 83%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
`;

const CalendarContainer = styled.div`
  width: 60%;
  height: 83%;
  background-color: #f8fbfb;
  border-radius: 0.625rem;
  .react-calendar {
    width: 100%;
    height: 100%;
  }
  .react-calendar__navigation {
    display: flex;
    margin-bottom: 5%;
    .react-calendar__navigation__label {
      font-size: 1.25rem;
      font-weight: bold;
    }

    .react-calendar__navigation__arrow {
      font-size: 1.563rem;
      flex-grow: 0.333;
    }
  }
  .react-calendar__viewContainer {
    width: 100%;
    height: 100%;
  }
  .react-calendar__month-view {
    width: 100%;
    height: 100%;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
  } //요일
  button {
    background-color: #f8fbfb;
    border: 0;
    border-radius: 0.188rem;
    color: black;
    padding: 0.313rem 0;
    cursor: pointer;
    &:hover {
      border-bottom: 0.25rem solid #47d2d2;
    }

    &:active {
      border-bottom: 0.25rem solid #47d2d2;
    }
  }
  .react-calendar__month-view__days {
    display: grid !important;
    height: 80%;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;
    grid-template-rows: repeat(5, 50%);
    .react-calendar__tile {
      font-size: 1rem;
      font-weight: 400;
      max-width: initial !important;
    }
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.5;
  }
  .react-calendar__month-view__days__day--weekend {
    color: red;
  }
  .react-calendar__tile--range {
    color: #47d2d2;
  }
`;

const ScheduleContainer = styled.div`
  width: 33%; //450
  height: 92%; //594
  background-color: #f8fbfb;
  border-radius: 0.625rem;
`;

const ScheduleDate = styled.div`
  width: 100%;
  height: 5%;
  font-size: 1.563rem;
  font-weight: bold;
  text-align: center;
`;

const ScheduleListGroup = styled.div`
  width: 100%;
`;

const ScheduleList = styled.div`
  width: 90%;
  height: 2.75rem;
  font-size: 1rem;
`;

const AddButton = styled.div`
  width: 109px;
  height: 38px;
  font-size: 1rem;
  text-align: center;
  background-color: #47d2d2;
  border-radius: 0.625rem;
  cursor: pointer;
`;

const todolist = [
  { title: "회의 10시", author: "조성훈" },
  { title: "회의 10시", author: "조성훈" },
  { title: "회의 10시", author: "조성훈" },
  { title: "회의 10시", author: "조성훈" },
];

const CalendarTab = () => {
  const [value, setValue] = useState(new Date());
  const [clickedDay, setClickedDay] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const clickDay = (value) => {
    console.log(value);
    setClickedDay(format(value, "MMMM dd"));
  };
  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <CalendarContainer>
        <Calendar
          onChange={setValue}
          calendarType="US"
          value={value}
          locale="en-EN"
          maxDetail="month"
          minDetail="month"
          navigationLabel={null}
          onClickDay={clickDay}
        />
      </CalendarContainer>
      <ScheduleContainer>
        <ScheduleDate>{clickedDay}</ScheduleDate>
        <ScheduleListGroup>
          {todolist.map((v, i) => (
            <ScheduleList key={`list-${i}`}>
              {v.title}
              {v.author}
            </ScheduleList>
          ))}
        </ScheduleListGroup>
        <AddButton onClick={handleModalOpen}>일정 추가</AddButton>
      </ScheduleContainer>
      {isOpen && <CalendarModal isOpen={isOpen} handleOpen={handleModalOpen} />}
    </Container>
  );
};

//https://velog.io/@khy226/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%95%B1%EC%97%90-%EB%8B%AC%EB%A0%A5react-calendar-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
//https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/
//https://dev.to/fitzgeraldkd/react-calendar-with-custom-styles-30c9
export default CalendarTab;
