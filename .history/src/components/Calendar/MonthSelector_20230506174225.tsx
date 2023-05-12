import React from "react";
import styled from "@emotion/styled";
import { MonthSelectorProps } from "types/calendarTypes";

const MonthSelector = (currentDate, setCurrentDate): MonthSelectorProps => {
  return (
    <CalendarMonthWrapper>
      <CalendarMonthButton
        onClick={() => {
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1
          );
          updateCalendarDate(date);
        }}
      >
        ◀
      </CalendarMonthButton>
      <div>
        <span>{currentDate.getFullYear()}년 </span>
        <span>{currentDate.getMonth() + 1}월</span>
      </div>
      <CalendarMonthButton
        onClick={() => {
          const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            1
          );
          updateCalendarDate(date);
        }}
      >
        ▶
      </CalendarMonthButton>
    </CalendarMonthWrapper>
  );
};

export default MonthSelector;

const CalendarMonthWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 4rem;
  text-align: center;
  background: #ffea92;
`;

const CalendarMonthButton = styled.button`
  margin: 0 1rem 0 1rem;
  display: inline-block;
  background: none;
  line-height: 4rem;
  cursor: pointer;
`;
