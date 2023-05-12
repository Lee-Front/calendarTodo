import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import MonthSelector from "../components/Calendar/MonthSelector";
import DayList from "../components/Calendar/DayList";
import useAuthStore from "stores/auth";

const CalendarPage: React.FC = () => {
  const nav = useNavigate();
  const { isLogin } = useAuthStore((state) => state.isLogin);
  console.log("isLogin: ", isLogin);
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