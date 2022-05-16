import React, { useState } from "react";
import styled from "@emotion/styled";
import { format } from "date-fns";
import Calendar from "react-calendar";
//1367 645
const Container = styled.div`
  width: 100%;
  height: 83%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const CalendarContainer = styled.div`
  width: 60%;
  height: 536px;
  background-color: #f8fbfb;
  border-radius: 10px;
  .react-calendar__navigation {
    display: flex;
    margin-bottom: 5%;
    .react-calendar__navigation__label {
      font-size: 20px;
      font-weight: bold;
    }

    .react-calendar__navigation__arrow {
      font-size: 25px;
      flex-grow: 0.333;
    }
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
  }
  button {
    background-color: #f8fbfb;
    border: 0;
    border-radius: 3px;
    color: black;
    padding: 5px 0;
    cursor: pointer;
    &:hover {
      background-color: #47d2d2;
    }

    &:active {
      background-color: #47d2e5;
    }
  }
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;
    grid-template-rows: repeat(5, minmax(5rem, auto));
    .react-calendar__tile {
      font-size: 15px;
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

const CalendarTab = () => {
  const [value, setValue] = useState(new Date());
  const [clickedDay, setClickedDay] = useState("");
  const clickDay = (value) => {
    console.log(value);
    setClickedDay(format(value, "yyyy-MM-dd"));
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
      <div>{clickedDay}</div>
    </Container>
  );
};

//https://velog.io/@khy226/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%95%B1%EC%97%90-%EB%8B%AC%EB%A0%A5react-calendar-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
//https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/
//https://dev.to/fitzgeraldkd/react-calendar-with-custom-styles-30c9
export default CalendarTab;
