import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { useNavigate } from "react-router-dom";

interface CalendarDayInfo {
  other: boolean;
  day: number;
}

const CalendarPage = () => {
  const nav = useNavigate();
  // const dayInfos: CalendarDayInfo[] = [];
  // const currentDate = new Date(2023, 4, 25);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dayInfos, setDayInfos] = useState<CalendarDayInfo[]>([]);

  useEffect(() => {
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

    const dyas: CalendarDayInfo[] = [];
    // 이전 월의 마지막 날
    for (let i = firstDay - 1; i >= 0; i--) {
      dyas.push({ other: true, day: prevLastDate.getDate() - i });
    }

    // 현재 월의 날짜
    for (let i = 1; i <= lastDate.getDate(); i++) {
      dyas.push({ other: false, day: i });
    }

    // 다음 월의 첫 날
    for (let i = 1; i <= 6 - lastDate.getDay(); i++) {
      dyas.push({ other: true, day: i });
    }
    setDayInfos(dyas);
  }, [currentDate]);

  return (
    <CalendarContainer>
      <CalendarMonthWrapper>4월</CalendarMonthWrapper>
      <CalendarDayWrapper>
        {Array(Math.ceil(dayInfos.length / 7))
          .fill(null)
          .map((_, index) => (
            <CalendarWeek key={index}>
              {dayInfos.slice(index * 7, index * 7 + 7).map((dayInfo) => (
                <CalendarDay
                  isOtherMonth={dayInfo.other}
                  key={`${index}_${dayInfo.day}`}
                  onClick={() => {
                    nav("/", { state: { direction: "left" } });
                  }}
                >
                  {dayInfo.day}
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
