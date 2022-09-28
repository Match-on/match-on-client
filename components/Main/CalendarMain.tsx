import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { format, parseISO } from "date-fns";
import Calendar from "react-calendar";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Edit from "/public/myprojectSVG/Edit_Pencil.svg";
//1367 645
interface Member {
  name: string;
}
interface Schedule {
  scheduleIdx: number;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
  member: Member;
}

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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .react-calendar {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 5px 10px 5px 10px;
  }
  .react-calendar__navigation {
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-evenly;
    height: 3rem;
    .react-calendar__navigation__label {
      font-size: 1rem;
      font-weight: 500;
      /* &:hover {
        color: #47d2d2;
        border: none;
      } */
    }
    .react-calendar__navigation__next2-button {
      display: none;
    }
    .react-calendar__navigation__next-button {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 80%;
    }
    .react-calendar__navigation__prev-button {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 80%;
    }
    .react-calendar__navigation__prev2-button {
      display: none;
    }
    .react-calendar__navigation__arrow {
      font-size: 3rem;
      flex-grow: 1;
      color: #c4c4c4;
      /* &:hover {
        font-weight: bold;
        color: #47d2d2;
        border: none;
      } */
    }
  }

  .react-calendar__viewContainer {
    width: 100%;
    height: 85%;
    border: none;
    border-radius: 10px;
    padding: 15px 5px 0 5px;
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
    border: 0;
    color: black;
    background-color: #ffffff;
    height: 100%;
    > abbr {
      font-size: 0.875rem;
      @media screen and (max-width: 760px) {
        font-size: 1rem;
      }
    }
    cursor: pointer;
    /* &:hover {
      font-weight: bold;
    }

    &:active {
      border-bottom: 0.25rem solid #47d2d2;
    } */
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
  padding: 10px;
  background-color: #ffffff;
  border-radius: 0.625rem;
  @media screen and (max-width: 760px) {
    display: none;
  }
  .add_section {
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const ScheduleList = styled.div<{ color: string }>`
  width: calc(100% - 1rem);
  height: 3rem;
  border-left: ${(props) => `4px solid ${props.color}`};
  font-size: 1rem;
  margin: 0.5rem;
  padding: 0.2rem 0 0.2rem 1rem;
  background-clip: content-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .schedule_title {
    font-size: 0.85rem;
    > svg {
      cursor: pointer;
    }
  }
  .schedule_member {
    font-size: 0.75rem;
    color: #c6c6c6;
  }
`;

const Dot = styled.div`
  width: 100%;
  height: 2px;
  background: #47d2d2;
  margin-right: 3px;
`;

const CalendarMain = ({
  todaySchedule,
  monthSchedule,
}: {
  todaySchedule: Schedule[];
  monthSchedule: Schedule[];
}) => {
  const { data: session, status } = useSession();

  console.log(todaySchedule);

  const router = useRouter();
  const [value, setValue] = useState(new Date());
  const [clickedDay, setClickedDay] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const clickDay = (value) => {
    setClickedDay(value);
  };
  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <CalendarContainer>
        <Calendar
          calendarType="US"
          value={value}
          locale="en-EN"
          maxDetail="month"
          minDetail="month"
          formatDay={(locale, date) => format(date, "dd")}
          navigationLabel={null}
          // onClickDay={clickDay}
          showNeighboringMonth={true}
          // tileContent={({ date, view }) => {
          //   if (
          //     view === "month" &&
          //     monthSchedule.find((x) => {
          //       return (
          //         parseISO(x.startTime) < date && parseISO(x.endTime) > date
          //       );
          //     })
          //   ) {
          //     return <Dot></Dot>;
          //   }
          // }}
        />
      </CalendarContainer>
      <ScheduleContainer>
        {todaySchedule.map((v, i) => (
          <ScheduleList key={`list-${i}`} color={v.color}>
            <div className="schedule_title">
              {v.title}
              {/* <Edit /> */}
            </div>
            <div className="schedule_member">{v.member.name}</div>
          </ScheduleList>
        ))}
      </ScheduleContainer>
    </Container>
  );
};

export default CalendarMain;
