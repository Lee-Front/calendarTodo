import React, { useState } from "react";
import styled from "@emotion/styled";
import MonthSelector from "../components/calendar/MonthSelector";
import DayList from "../components/calendar/DayList";

const CalendarPage: React.FC = () => {
  return (
    <CalendarContainer>
      <MonthSelector></MonthSelector>
      <DayList></DayList>
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
