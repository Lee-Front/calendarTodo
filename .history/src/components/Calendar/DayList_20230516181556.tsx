import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { DayInfo, DateRange, TodoInfo } from "../../types/calendarTypes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostIt from "../calendar/PostIt";
import useDateStore from "../../stores/useDateStore";
import useAuthStore from "../../stores/useAuthStore";
import { decodeJwt } from "jose";

const DayList = () => {
  const [dayInfos, setDayInfos] = useState<DayInfo[]>([]);
  const { currentDate, setSelectDate } = useDateStore();
  const { userId } = useAuthStore();
  console.log("userId : ", userId);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { calendarDayInfos, calendarInfo } = createCalendar(currentDate);
      const todoInfos: { [key: string]: TodoInfo } = await getTodoListByCurrentMonth(calendarInfo);

      calendarDayInfos.map((info) => {
        const date = `${info.year}-${info.month}-${info.day}`;
        if (todoInfos[date]) {
          info.todoInfo = todoInfos[date];
        }
        return info;
      });

      setDayInfos(calendarDayInfos);
    };
    fetchData();
  }, [currentDate]);

  const getTodoListByCurrentMonth = async ({ startDate, endDate }: DateRange) => {
    const params = {
      startDate: startDate,
      endDate: endDate,
      userId,
    };

    const response = await axios.get("/calendar", { params });

    return response?.data;
  };

  const dayColor = (month: number, dayOfWeek: number, selectDate: Date) => {
    const isDifferentMonth = month !== selectDate.getMonth();
    let textColor = "#4c4c4c";
    let backgroundColor = isDifferentMonth ? "#fff0b3" : "#ffea92";

    if (dayOfWeek === 0) {
      textColor = isDifferentMonth ? "#d8999d" : "#e85c5e";
    } else if (dayOfWeek === 6) {
      textColor = isDifferentMonth ? "#8ba8d2" : "#6383bc";
    }

    return [textColor, backgroundColor];
  };

  const createCalendar = (curDate: Date): { calendarDayInfos: DayInfo[]; calendarInfo: DateRange } => {
    const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getDay();
    const lastDate = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0);

    const prevLastDate = new Date(curDate.getFullYear(), curDate.getMonth(), 1 - firstDay);
    const nextLastDate = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 6 - lastDate.getDay());

    const calendarInfo: DateRange = {
      startDate: prevLastDate,
      endDate: nextLastDate,
    };

    const calendarDayInfos: DayInfo[] = [
      ...Array.from({ length: firstDay }, (_, i) => {
        const day = prevLastDate.getDate() + i;
        const [textColor, backgroundColor] = dayColor(prevLastDate.getMonth(), prevLastDate.getDay(), currentDate);
        return {
          year: prevLastDate.getFullYear(),
          month: prevLastDate.getMonth(),
          day,
          textColor,
          backgroundColor,
        };
      }),
      ...Array.from({ length: lastDate.getDate() }, (_, i) => {
        const day = i + 1;
        const [textColor, backgroundColor] = dayColor(
          curDate.getMonth(),
          new Date(curDate.getFullYear(), curDate.getMonth(), day).getDay(),
          currentDate
        );

        return {
          year: curDate.getFullYear(),
          month: curDate.getMonth(),
          day,
          textColor,
          backgroundColor,
        };
      }),
    ];

    if (lastDate.getDay() !== 6) {
      calendarDayInfos.push(
        ...Array.from({ length: 6 - lastDate.getDay() }, (_, i) => {
          const day = i + 1;
          const [textColor, backgroundColor] = dayColor(
            nextLastDate.getMonth(),
            new Date(nextLastDate.getFullYear(), nextLastDate.getMonth(), day).getDay(),
            currentDate
          );
          return {
            year: nextLastDate.getFullYear(),
            month: nextLastDate.getMonth(),
            day,
            textColor,
            backgroundColor,
          };
        })
      );
    }

    return { calendarDayInfos, calendarInfo };
  };

  const navigateToTodo = (dayInfo: DayInfo) => {
    setSelectDate(new Date(dayInfo.year, dayInfo.month, dayInfo.day));
    nav("/todo", {
      state: {
        direction: "left",
      },
    });
  };

  return (
    <CalendarDayWrapper>
      {Array(Math.ceil(dayInfos.length / 7))
        .fill(null)
        .map((_, index) => (
          <CalendarWeek key={index}>
            {dayInfos.slice(index * 7, index * 7 + 7).map((dayInfo) => {
              return (
                <CalendarDay
                  textColor={dayInfo.textColor}
                  backgroundColor={dayInfo.backgroundColor}
                  key={`${index}_${dayInfo.day}`}
                  onClick={() => navigateToTodo(dayInfo)}
                >
                  {dayInfo.todoInfo ? (
                    <PostIt dayInfo={dayInfo} backgroundColor={dayInfo.backgroundColor}></PostIt>
                  ) : (
                    dayInfo.day
                  )}
                </CalendarDay>
              );
            })}
          </CalendarWeek>
        ))}
    </CalendarDayWrapper>
  );
};

export default DayList;

const CalendarDayWrapper = styled.div`
  background-color: #ffea92;
  padding: 1rem;
  border-bottom: 2px solid white;
`;

const CalendarWeek = styled.div`
  display: flex;
`;

const CalendarDay = styled.div<{ textColor: string; backgroundColor: string }>`
  position: relative;
  font-size: 2rem;
  flex: 1;
  padding: 0.5rem;
  aspect-ratio: 1;
  color: ${(props) => props.textColor};
  background: ${(props) => props.backgroundColor};
`;
