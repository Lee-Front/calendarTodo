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
        {/* <CalendarText size={2.5}>{currentDate.getFullYear()}년 </CalendarText>
        <CalendarText size={4}>{currentDate.getMonth() + 1}월</CalendarText> */}
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
  position: relative;
  justify-content: space-between;
  align-items: center;
  font-size: 4rem;
  text-align: center;
  padding: 1.2rem 2rem;
  background: #ffea92;
  ::after {
    content: "";
    position: absolute;
    border-bottom: 2px solid #4c4c4c;
    bottom: 0;
    left: 5rem;
    right: 5rem;
  }
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
`;

const CalendarTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarText = styled.span<{ size: number }>`
  font-size: ${(props) => props.size}rem;
  line-height: ${(props) => props.size}rem;
`;
const CalendarYear = styled.span`
  font-size: 2.5rem;
  line-height: 2.5rem;
`;

const CalendarMonth = styled.span`
  font-size: 4rem;
  line-height: 4rem;
`;
