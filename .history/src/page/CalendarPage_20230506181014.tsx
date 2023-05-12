import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import MonthSelector from "../components/Calendar/MonthSelector";
import DayList from "../components/Calendar/DayList";

const CalendarPage: React.FC = () => {
  const nav = useNavigate();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const updateCalendarDate = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <CalendarContainer>
      <MonthSelector
        currentDate={currentDate}
        setCurrentDate={updateCalendarDate}
      ></MonthSelector>
      <DayList currentDate={currentDate}></DayList>
    </CalendarContainer>
  );
};

export default CalendarPage;

const CalendarContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
