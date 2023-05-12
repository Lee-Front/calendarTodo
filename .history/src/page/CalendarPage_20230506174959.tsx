import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CalendarDayInfo,
  CalendarRange,
  DayTodoInfo,
} from "../types/calendarTypes";
import MonthSelector from "../components/Calendar/MonthSelector";

const CalendarPage: React.FC = () => {
  const nav = useNavigate();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [dayInfos, setDayInfos] = useState<CalendarDayInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const calendar = createCalendar(currentDate);
      const calendarTodoInfo: { [key: string]: DayTodoInfo } =
        await getCalendar(calendar.calendarInfo);
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

  const getCalendar = async (searchInfo: CalendarRange) => {
    const params = {
      startDate: searchInfo.startDate,
      endDate: searchInfo.endDate,
    };
    const response = await axios.get("/calendar", { params });
    return response?.data;
  };

  const updateCalendarDate = (date: Date) => {
    setCurrentDate(date);
  };

  const createCalendar = (
    curDate: Date
  ): { calendarDayInfos: CalendarDayInfo[]; calendarInfo: CalendarRange } => {
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getDay();
    const lastDate = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0);

    const prevLastDate = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1 - firstDay
    );
    const nextLastDate = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      6 - lastDate.getDay()
    );
    const calendarInfo: CalendarRange = {
      startDate: prevLastDate,
      endDate: nextLastDate,
    };

    const calendarDayInfos: CalendarDayInfo[] = [
      ...Array.from({ length: firstDay }, (_, i) => {
        const day = prevLastDate.getDate() + i;
        return {
          year: prevLastDate.getFullYear(),
          month: prevLastDate.getMonth(),
          day,
        };
      }),
      ...Array.from({ length: lastDate.getDate() }, (_, i) => {
        const day = i + 1;
        return { year: curDate.getFullYear(), month: curDate.getMonth(), day };
      }),
    ];

    if (lastDate.getDay() !== 6) {
      calendarDayInfos.push(
        ...Array.from({ length: 6 - lastDate.getDay() }, (_, i) => {
          const day = i + 1;
          return {
            year: nextLastDate.getFullYear(),
            month: nextLastDate.getMonth(),
            day,
          };
        })
      );
    }

    return { calendarDayInfos, calendarInfo };
  };

  return (
    <CalendarContainer>
      <MonthSelector
        currentDate={currentDate}
        setCurrentDate={updateCalendarDate}
      ></MonthSelector>
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
