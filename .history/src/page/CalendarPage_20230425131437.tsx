import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { useNavigate } from "react-router-dom";

interface CalendarDayInfo {
  other: boolean;
  day: number;
}

const CalendarPage: React.FC = () => {
  const nav = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dayInfos, setDayInfos] = useState<CalendarDayInfo[]>([]);

  useEffect(() => {
    const days = createCalendar(currentDate);
    setDayInfos(days);
  }, [currentDate]);

  const createCalendar = (cur: Date): CalendarDayInfo[] => {
    const firstDay = new Date(cur.getFullYear(), cur.getMonth(), 1).getDay();

    const lastDate = new Date(cur.getFullYear(), cur.getMonth() + 1, 0);

    // 이전 월의 마지막 날
    const prevLastDate = new Date(cur.getFullYear(), cur.getMonth(), 0);

    const days: CalendarDayInfo[] = [];
    // 이전 월의 마지막 날
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ other: true, day: prevLastDate.getDate() - i });
    }

    // 현재 월의 날짜
    for (let i = 1; i <= lastDate.getDate(); i++) {
      days.push({ other: false, day: i });
    }

    // 다음 월의 첫 날
    for (let i = 1; i <= 6 - lastDate.getDay(); i++) {
      days.push({ other: true, day: i });
    }
    return days;
  };

  return (
    <CalendarContainer>
      <CalendarMonthWrapper>
        <CalendarMonthButton>◀</CalendarMonthButton>
        4월
        <CalendarMonthButton>▶</CalendarMonthButton>
      </CalendarMonthWrapper>
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
  /* display: flex;
  justify-content: space-between; */
  font-size: 4rem;
  text-align: center;
  border-bottom: 0.2rem solid white;
  background: #ffc965;
`;

const CalendarMonthButton = styled.div`
  display: inline-block;
  background: none;
  cursor: pointer;
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
