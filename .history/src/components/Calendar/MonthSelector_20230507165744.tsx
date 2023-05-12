import React from "react";
import styled from "@emotion/styled";
import { MonthSelectorProps } from "types/calendarTypes";
import LeftArrow from "../../images/leftArrow.svg";
import RightArrow from "../../images/rightArrow.svg";

const MonthSelector = ({ currentDate, setCurrentDate }: MonthSelectorProps) => {
  const handleMonthChange = (curDate: Date) => {
    const date = new Date(curDate.getFullYear(), curDate.getMonth() - 1, 1);
    setCurrentDate(date);
  };
  return (
    <MonthSelectorContainer>
      <CalendarMonthButton onClick={() => handleMonthChange(currentDate)}>
        <CalendarMonthButtonImg src={LeftArrow} />
      </CalendarMonthButton>
      <CalendarTitle>
        <CalendarYear>{currentDate.getFullYear()}년 </CalendarYear>
        <CalendarMonth>{currentDate.getMonth() + 1}월</CalendarMonth>
      </CalendarTitle>
      <CalendarMonthButton onClick={() => handleMonthChange(currentDate)}>
        <CalendarMonthButtonImg src={RightArrow} />
      </CalendarMonthButton>
    </MonthSelectorContainer>
  );
};

export default MonthSelector;

const MonthSelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 4rem;
  text-align: center;
  background: #ffea92;
`;

const CalendarMonthButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 1rem 0 1rem;
  display: inline-block;
  background: none;
  line-height: 4rem;
  cursor: pointer;
`;

const CalendarMonthButtonImg = styled.img`
  width: 100%;
  height: 100%;
`;

const CalendarTitle = styled.div`
  display: flex;
`;

const CalendarYear = styled.span``;

const CalendarMonth = styled.span``;
