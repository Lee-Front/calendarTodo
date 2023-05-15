import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import MonthSelector from "../components/calendar/MonthSelector";
import DayList from "../components/calendar/DayList";
import useAuthStore from "../stores/useAuthStore";

const CalendarPage: React.FC = () => {
  console.log("dd");
  const nav = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const updateCalendarDate = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <CalendarContainer>
      <MonthSelector currentDate={currentDate} setCurrentDate={updateCalendarDate}></MonthSelector>
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
  background-color: #ffea92;
`;
