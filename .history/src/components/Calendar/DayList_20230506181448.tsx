import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  CalendarDayInfo,
  CalendarRange,
  DayListProps,
  TodoInfo,
} from "../../types/calendarTypes";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DayList = ({ currentDate }: DayListProps) => {
  const [dayInfos, setDayInfos] = useState<CalendarDayInfo[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const calendar = createCalendar(currentDate);
      const calendarTodoInfo: { [key: string]: TodoInfo } = await getCalendar(
        calendar.calendarInfo
      );
      const calendatDayInfos = calendar.calendarDayInfos;

      calendatDayInfos.map((info) => {
        const date = `${info.year}-${info.month}-${info.day}`;
        if (calendarTodoInfo[date]) {
          info.todoInfo = calendarTodoInfo[date];
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
    <CalendarDayWrapper>
      {Array(Math.ceil(dayInfos.length / 7))
        .fill(null)
        .map((_, index) => (
          <CalendarWeek key={index}>
            {dayInfos.slice(index * 7, index * 7 + 7).map((dayInfo) => {
              return (
                <CalendarDay
                  isDifferentMonth={dayInfo.month !== currentDate.getMonth()}
                  key={`${index}_${dayInfo.day}`}
                  onClick={() => {
                    nav("/todo", {
                      state: {
                        direction: "left",
                        date: {
                          year: dayInfo.year,
                          month: dayInfo.month + 1,
                          day: dayInfo.day,
                        },
                      },
                    });
                  }}
                >
                  <span style={{ position: "absolute" }}>{dayInfo.day}</span>
                  {dayInfo.todoInfo ? (
                    <CalendarDayPost>
                      <TestDiv dayTodoInfo={dayInfo.dayTodoInfo}>
                        <span style={{ zIndex: "100", position: "relative" }}>
                          {dayInfo.dayTodoInfo?.total}/
                          {dayInfo.dayTodoInfo?.completed}
                        </span>
                      </TestDiv>
                    </CalendarDayPost>
                  ) : null}
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
`;

const CalendarWeek = styled.div`
  display: flex;
`;

const CalendarDay = styled.div<{ isDifferentMonth: boolean }>`
  position: relative;
  font-size: 2rem;
  flex: 1;
  padding: 0.5rem;
  aspect-ratio: 1;
  background: ${(props) => (props.isDifferentMonth ? "#fff0b3" : "#ffea92")};
`;

const CalendarDayPost = styled.div`
  position: relative;
  font-size: 2rem;
  flex: 1;
  padding: 0.5rem;
  aspect-ratio: 1;

  ::before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    border-top: 15px solid #ffd27f;
    border-right: 15px solid transparent;
    background: #fceac9;
  }
`;

const TestDiv = styled.div<{ dayTodoInfo?: TodoInfo }>`
  position: relative;
  width: 100%;
  height: 1rem;
  font-size: 1rem;
  line-height: 1rem;
  background: white;

  ::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) =>
      props?.dayTodoInfo
        ? (props?.dayTodoInfo.completed / props?.dayTodoInfo.total) * 100 + "%"
        : "0%"};
    height: 100%;
    background-color: green;
  }
`;
