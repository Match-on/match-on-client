import React, { useState } from "react";
import styled from "@emotion/styled";
import { format } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

const CalendarComponent = () => {
  const [value, setValue] = useState(new Date());
  const [clickedDay, setClickedDay] = useState("");
  const clickDay = (value) => {
    console.log(value);
    setClickedDay(format(value, "yyyy-mm-dd"));
  };

  return (
    <>
      <div>
        <Calendar
          onChange={setValue}
          value={value}
          locale="en-EN"
          maxDetail="month"
          minDetail="month"
          navigationLabel={null}
          showNeighboringMonth={false}
          onClickDay={clickDay}
        />
      </div>
      <div>{clickedDay}</div>
    </>
  );
};

//https://velog.io/@khy226/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%95%B1%EC%97%90-%EB%8B%AC%EB%A0%A5react-calendar-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
//https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/

const CalendarTab = () => {
  return (
    <Container>
      <CalendarComponent />
    </Container>
  );
};

export default CalendarTab;
