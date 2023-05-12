import React from "react";
import styled from "@emotion/styled";
import { MonthSelectorProps } from "types/calendarTypes";
import LeftArrow from "../../images/leftArrow.svg";

const MonthSelector = ({ currentDate, setCurrentDate }: MonthSelectorProps) => {
  return (
    <MonthSelectorContainer>
      <CalendarMonthButton
        onClick={() => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
          setCurrentDate(date);
        }}
      >
        <CalendarMonthButtonImg src={LeftArrow} />
      </CalendarMonthButton>
      <div>
        <span>{currentDate.getFullYear()}년 </span>
        <span>{currentDate.getMonth() + 1}월</span>
      </div>
      <CalendarMonthButton
        onClick={() => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
          setCurrentDate(date);
        }}
      >
        ▶
      </CalendarMonthButton>
    </MonthSelectorContainer>
  );
};

export default MonthSelector;

const MonthSelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 4rem;
  text-align: center;
  background: #ffea92;
`;

const CalendarMonthButton = styled.button`
  width: 4rem;
  height: 4rem;
  margin: 0 1rem 0 1rem;
  display: inline-block;
  background: none;
  line-height: 4rem;
  cursor: pointer;
`;

const CalendarMonthButtonImg = styled.img`
  width: 100%;
  height: 100%;
  stroke-width: 0.3rem;
`;
