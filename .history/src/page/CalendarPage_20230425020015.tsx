import React from "react";
import styled from "@emotion/styled";

import { useNavigate } from "react-router-dom";

const CalendarPage = () => {
  const nav = useNavigate();
  const days: Object[] = [];
  const currentDate = new Date(2023, 4, 25);

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const lastDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // 이전 월의 마지막 날
  const prevLastDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  );

  // 이전 월의 마지막 날
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ type: "other", day: prevLastDate.getDate() - i });
  }

  // 현재 월의 날짜
  for (let i = 1; i <= lastDate.getDate(); i++) {
    days.push(i);
  }

  // 다음 월의 첫 날
  for (let i = 1; i <= 6 - lastDate.getDay(); i++) {
    days.push(i);
  }

  return (
    <CalendarContainer>
      <CalendarMonthWrapper>4월</CalendarMonthWrapper>
      <CalendarDayWrapper>
        {Array(Math.ceil(days.length / 7))
          .fill(null)
          .map((_, index) => (
            <CalendarWeek key={index}>
              {days.slice(index * 7, index * 7 + 7).map((day) => (
                <CalendarDay
                  isOtherMonth={index === 0 && firstDay < day}
                  key={`${index}_${day}`}
                  onClick={() => {
                    nav("/", { state: { direction: "left" } });
                  }}
                >
                  {day}
                </CalendarDay>
              ))}
            </CalendarWeek>
          ))}
      </CalendarDayWrapper>
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

const CalendarMonthWrapper = styled.div`
  font-size: 4rem;
  text-align: center;
  border-bottom: 0.2rem solid white;
  background: #ffc965;
`;

const CalendarDayWrapper = styled.div`
  flex: 1;
  background: #e9e9e9;
`;

const CalendarWeek = styled.div`
  display: flex;
`;

const CalendarDay = styled.div<{ isOtherMonth: boolean }>`
  font-size: 2rem;
  padding-left: 0.5rem;
  flex: 1;
  aspect-ratio: 1;
  background: ${(props) => (props.isOtherMonth ? "#fceac9" : "#ffdea2")};
`;
