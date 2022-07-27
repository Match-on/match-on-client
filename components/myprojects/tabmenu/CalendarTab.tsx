import React, { useState } from "react";
import styled from "@emotion/styled";
import { format } from "date-fns";
import Calendar from "react-calendar";
import CalendarModal from "./TabContents/Input/CalendarInputModal";
//1367 645
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
`;

const CalendarContainer = styled.div`
  width: 60%;
  height: 92%;
  background-color: #f8fbfb;
  .react-calendar {
    width: 100%;
    height: 100%;
  }
  .react-calendar__navigation {
    display: flex;
    /* margin-bottom: 5%; */
    justify-content: space-evenly;
    height: 15%;
    .react-calendar__navigation__label {
      font-size: 1.125rem;
      font-weight: 400;
      &:hover {
        color: #47d2d2;
        border: none;
      }
    }
    .react-calendar__navigation__next2-button {
      display: none;
    }
    .react-calendar__navigation__next-button {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
    }
    .react-calendar__navigation__prev-button {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 100%;
    }
    .react-calendar__navigation__prev2-button {
      display: none;
    }
    .react-calendar__navigation__arrow {
      font-size: 2rem;
      flex-grow: 1;
      color: #c4c4c4;
      &:hover {
        font-weight: bold;
        color: #47d2d2;
        border: none;
      }
    }
  }

  .react-calendar__viewContainer {
    width: 100%;
    height: 85%;
    border: 0.5px solid #aaaaaa;
    padding: 5%;
  }
  .react-calendar__month-view {
    width: 100%;
    height: 100%;
    > div {
      height: 10%;
    }
    div > div {
      height: 100%;
    }
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    border: none;
    height: 50px;
    div > abbr {
      text-decoration: none;
    }
  }
  .react-calendar__month-view__weekdays {
    border: none;
  }
  button {
    background-color: #f8fbfb;
    border: 0;
    color: black;
    height: 100%;
    > abbr {
      font-size: 0.875rem;
      @media screen and (max-width: 760px) {
        font-size: 1rem;
      }
    }
    cursor: pointer;
    &:hover {
      border-bottom: 1px solid #47d2d2;
    }

    &:active {
      border-bottom: 0.25rem solid #47d2d2;
    }
  }
  .react-calendar__month-view__days {
    height: 90%;
    .react-calendar__tile {
      font-size: 1rem;
      max-width: initial !important;
      height: 150%;
    }
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.2;
  }
  .react-calendar__month-view__days__day--weekend {
    color: red;
  }
  .react-calendar__tile--range {
    color: #47d2d2;
  }
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;

const ScheduleContainer = styled.div`
  width: 33%;
  height: 92%;
  background-color: #f8fbfb;
  border-radius: 0.625rem;
  @media screen and (max-width: 760px) {
    display: none;
  }
`;

const ScheduleDate = styled.div`
  width: 100%;
  height: 10%;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
  const [clickedDay, setClickedDay] = useState(format(new Date(), "MMMM dd"));
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
          formatDay={(locale, date) => format(date, "dd")}
          navigationLabel={null}
          onClickDay={clickDay}
          showNeighboringMonth={true}
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

//highlight https://breathtaking-life.tistory.com/147?category=835829
