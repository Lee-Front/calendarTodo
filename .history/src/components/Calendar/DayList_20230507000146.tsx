import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { DayInfo, DateRange, DayListProps, TodoInfo } from "../../types/calendarTypes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostIt from "./PostIt";

const DayList = ({ currentDate }: DayListProps) => {
  const [dayInfos, setDayInfos] = useState<DayInfo[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const calendar = createCalendar(currentDate);
      const calendarTodoInfo: { [key: string]: TodoInfo } = await getCalendar(calendar.calendarInfo);

      calendar.calendarDayInfos.map((info) => {
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

  const getCalendar = async (searchInfo: DateRange) => {
    const params = {
      startDate: searchInfo.startDate,
      endDate: searchInfo.endDate,
    };
    const response = await axios.get("/calendar", { params });
    return response?.data;
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
        return {
          year: prevLastDate.getFullYear(),
          month: prevLastDate.getMonth(),
          day,
          dayOfWeek: new Date(prevLastDate.getFullYear(), prevLastDate.getMonth(), day).getDay(),
        };
      }),
      ...Array.from({ length: lastDate.getDate() }, (_, i) => {
        const day = i + 1;
        return {
          year: curDate.getFullYear(),
          month: curDate.getMonth(),
          day,
          dayOfWeek: new Date(curDate.getFullYear(), curDate.getMonth(), day).getDay(),
        };
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
            dayOfWeek: new Date(nextLastDate.getFullYear(), nextLastDate.getMonth(), day).getDay(),
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
              //     const day = new Date(dayInfo.year, dayInfo.month, dayInfo.day).getDay();
              //     const dayColor = day === 0
              //   // 0 = red 6 = blue
              //   console.log("dayColor : ", dayColor);
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
                  {dayInfo.todoInfo ? (
                    <PostIt dayInfo={dayInfo} isDifferentMonth={dayInfo.month !== currentDate.getMonth()}></PostIt>
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
