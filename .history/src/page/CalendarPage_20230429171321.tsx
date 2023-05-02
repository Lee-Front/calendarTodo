import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isFunctionLike } from "typescript";

interface CalendarDayInfo {
  year: number;
  month: number;
  day: number;
  dayTodoInfo?: DayTodoInfo;
}

interface SearchInfo {
  startDate: string;
  endDate: string;
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
      const calendar = createCalendar(currentDate);
      // [key: string]: { total: number; completed: number }
      const calendarTodoInfo: { [key: string]: DayTodoInfo } =
        await getCalendar(calendar.searchInfo);

      const calendatDayInfos = calendar.calendarDayInfos;

      calendatDayInfos.map((info) => {
        const date = `${info.year}-${info.month}-${info.day}`;
        if (calendarTodoInfo[date]) {
          info.dayTodoInfo = calendarTodoInfo[date];
        }
        return info;
      });

      setDayInfos(calendar.calendarDayInfos);
    };
    fetchData();
  }, [currentDate]);

  const getCalendar = async (searchInfo: SearchInfo) => {
    const params = {
      startDate: searchInfo.startDate,
      endDate: searchInfo.endDate,
    };
    const response = await axios.get("/calendar", { params });
    const data = response.data;
    return data;
  };

  const updateCalendarDate = (date: DateInfo) => {
    setCurrentDate(date);
  };

  const createCalendar = (
    cur: DateInfo
  ): { calendarDayInfos: CalendarDayInfo[]; searchInfo: SearchInfo } => {
    const searchInfo: SearchInfo = { startDate: "", endDate: "" };
    const firstDay = new Date(cur.year, cur.month, 1).getDay();
    const lastDate = new Date(cur.year, cur.month + 1, 0);

    // 이전 월의 마지막 날
    const prevLastDate = new Date(cur.year, cur.month, -firstDay);
    const nextLastDate = new Date(cur.year, cur.month + 1, firstDay);

    searchInfo.startDate = `${prevLastDate.getFullYear()}-${
      prevLastDate.getMonth() + 1
    }-${prevLastDate.getDate() + 1}`;

    searchInfo.endDate = `${nextLastDate.getFullYear()}-${
      nextLastDate.getMonth() + 1
    }-${nextLastDate.getDate()}`;

    const calendarDayInfos: CalendarDayInfo[] = [];

    // 이전 월의 마지막 날
    for (let i = 1; i <= firstDay; i++) {
      calendarDayInfos.push({
        year: prevLastDate.getFullYear(),
        month: prevLastDate.getMonth(),
        day: prevLastDate.getDate() + i,
      });
    }

    // 현재 월의 날짜
    for (let i = 1; i <= lastDate.getDate(); i++) {
      calendarDayInfos.push({ year: cur.year, month: cur.month, day: i });
    }

    // 다음 월의 첫 날
    for (let i = 1; i <= nextLastDate.getDate(); i++) {
      calendarDayInfos.push({
        year: nextLastDate.getFullYear(),
        month: nextLastDate.getMonth(),
        day: i,
      });
    }

    return { calendarDayInfos, searchInfo };
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
                  isOtherMonth={dayInfo.month !== currentDate.month}
                  key={`${index}_${dayInfo.day}`}
                  onClick={() => {
                    console.log("dayInfo : ", dayInfo);
                    nav("/todo", {
                      state: {
                        direction: "left",
                        date: {
                          year: currentDate.year,
                          month: dayInfo.month + 1,
                          day: dayInfo.day,
                        },
                      },
                    });
                  }}
                >
                  {dayInfo.day}
                  {dayInfo.dayTodoInfo ? (
                    <TestDiv dayTodoInfo={dayInfo.dayTodoInfo}>
                      {dayInfo.dayTodoInfo?.total}/
                      {dayInfo.dayTodoInfo?.completed}
                    </TestDiv>
                  ) : null}
                </CalendarDay>
              ))}
            </CalendarWeek>
          ))}
      </CalendarDayWrapper>
    </CalendarContainer>
  );
};

export default CalendarPage;

const TestDiv = styled.div<{ dayTodoInfo?: DayTodoInfo }>`
  position: relative;
  width: 100%;
  height: 1rem;
  font-size: 1rem;
  line-height: 1rem;
  background: gray;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) =>
      props?.dayTodoInfo
        ? props?.dayTodoInfo.completed / props?.dayTodoInfo.total + "%"
        : "0%"};
    height: 100%;
    background-color: green;
  }
`;

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
