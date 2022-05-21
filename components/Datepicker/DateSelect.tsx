import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelect = ({ value, handleValue }) => {
  const [date, setDate] = useState(new Date());
  return <DatePicker selected={date} onChange={(date) => setDate(date)} onClick={handleValue} />;
};

export default DateSelect;
