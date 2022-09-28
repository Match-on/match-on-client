import styled from "@emotion/styled";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = styled(DatePicker)`
  .react-datepicker-wrapper {
    width: 100%;
    > div {
      width: none;
    }
  }
  .react-datepicker__input-container {
    display: flex;
  }
  .react-datepicker-ignore-onclickoutside {
    width: none;
    padding: none;
    margin: none;
  }
  .react-datepicker__tab-loop {
    width: none;
    .react-datepicker__triangel {
      left: 100px;
    }
  }
`;
const ContentBox = styled.div`
  position: relative;
  display: flex;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  z-index: 9;
`;
const DateSelect = ({ value, handleValue, time = "yes" }) => {
  const [date, setDate] = useState(new Date());
  const ExampleCustomInput = (
    props: React.HTMLProps<HTMLDivElement>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div
        {...props}
        style={{
          width: "100%",
          height: "100%",
          fontSize: "100%",
          color: "#47d2d2",
        }}
      >
        {props.value}
      </div>
    );
  };
  return (
    <ContentBox>
      <DatePicker
        // dateFormat="yyyy-MM-dd"
        selected={value}
        onChange={(date) => handleValue(date)}
        customInput={React.createElement(React.forwardRef(ExampleCustomInput))}
        timeInputLabel="Time:"
        dateFormat={time === "yes" ? "MM/dd/yyyy h:mm aa" : "yyyy-MM-dd"}
        showTimeInput={time === "yes" ? true : false}
      />
    </ContentBox>
  );
};

export default DateSelect;
