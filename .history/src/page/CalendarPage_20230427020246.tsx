import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CalendarDayInfo {
  other: boolean;
  day: number;
}

interface DateInfo {
  year: number;
  month: number;
  day?: number;
}

interface DayTodoInfo {
  day: number;
  total: number;
  completed: number;
}
const CalendarPage: React.FC = () => {
  const nav = useNavigate();
  const now = new Date();
  const [currentDate, setCurrentDate] = useState<DateInfo>({
    year: now.getFullYear(),
    month: now.getMonth(),
  });
  const [dayInfos, setDayInfos] = useState<CalendarDayInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        year: currentDate.year,
        month: currentDate.month + 1,
      };
      const calendarTodoInfo: DayTodoInfo[] = await getCalendar(params);
      const days = createCalendar(currentDate, calendarTodoInfo);
      setDayInfos(days);
    };
    fetchData();
  }, [currentDate]);

  const getCalendar = async (params: { year: number; month: number }) => {
    const response = await axios.get("/calendar", { params });
    const data = response.data;
    return data;
  };

  const updateCalendarDate = (date: DateInfo) => {
    setCurrentDate(date);
  };

  const createCalendar = (
    cur: DateInfo,
    calendarTodoInfo: DayTodoInfo[]
  ): CalendarDayInfo[] => {
    const firstDay = new Date(cur.year, cur.month, 1).getDay();
    const lastDate = new Date(cur.year, cur.month + 1, 0);

    // 이전 월의 마지막 날
    const prevLastDate = new Date(cur.year, cur.month, 0);

    const days: CalendarDayInfo[] = [];
    // 이전 월의 마지막 날
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ other: true, day: prevLastDate.getDate() - i });
    }

    // 현재 월의 날짜
    console.log("calendarTodoInfo : ", calendarTodoInfo);
    for (let i = 1; i <= lastDate.getDate(); i++) {
      console.log("i : ", calendarTodoInfo[i]);
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
        <CalendarMonthButton
          onClick={() => {
            const date = {
              year: currentDate.year,
              month: currentDate.month - 1,
            };
            updateCalendarDate(date);
          }}
        >
          ◀
        </CalendarMonthButton>
        <span>{currentDate.month + 1}월</span>
        <CalendarMonthButton
          onClick={() => {
            const date = {
              year: currentDate.year,
              month: currentDate.month + 1,
            };
            updateCalendarDate(date);
          }}
        >
          ▶
        </CalendarMonthButton>
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
                    nav("/todo", {
                      state: {
                        direction: "left",
                        date: {
                          year: currentDate.year,
                          month: currentDate.month + 1,
                          day: dayInfo.day,
                        },
                      },
                    });
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
  display: flex;
  justify-content: space-between;
  font-size: 4rem;
  text-align: center;
  border-bottom: 0.2rem solid white;
  background: #ffc965;
`;

const CalendarMonthButton = styled.button`
  margin: 0 1rem 0 1rem;
  display: inline-block;
  background: none;
  line-height: 4rem;
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
