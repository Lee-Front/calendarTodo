import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CalendarDayInfo {
  year: number;
  month: number;
  day: number;
  dayTodoInfo?: DayTodoInfo;
}

interface CalendarInfo {
  startDate: Date;
  endDate: Date;
}

interface DayTodoInfo {
  day: number;
  total: number;
  completed: number;
}
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

  const getCalendar = async (searchInfo: CalendarInfo) => {
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
  ): { calendarDayInfos: CalendarDayInfo[]; calendarInfo: CalendarInfo } => {
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
    const calendarInfo: CalendarInfo = {
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
      <CalendarMonthWrapper>
        <CalendarMonthButton
          onClick={() => {
            const date = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() - 1,
              1
            );
            updateCalendarDate(date);
          }}
        >
          ◀
        </CalendarMonthButton>
        <div>
          <span>{currentDate.getFullYear()}년 </span>
          <span>{currentDate.getMonth() + 1}월</span>
        </div>
        <CalendarMonthButton
          onClick={() => {
            const date = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              1
            );
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
              {dayInfos.slice(index * 7, index * 7 + 7).map((dayInfo) => {
                return (
                  <CalendarDay
                    isDifferentMonth={dayInfo.month !== currentDate.getMonth()}
                    hasTodo={!!dayInfo.dayTodoInfo}
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
                    {dayInfo.day}
                    {dayInfo.dayTodoInfo ? (
                      <TestDiv dayTodoInfo={dayInfo.dayTodoInfo}>
                        <span style={{ zIndex: "100", position: "relative" }}>
                          {dayInfo.dayTodoInfo?.total}/
                          {dayInfo.dayTodoInfo?.completed}
                        </span>
                      </TestDiv>
                    ) : null}
                  </CalendarDay>
                );
              })}
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
  background: #ffea92;
`;

const CalendarMonthButton = styled.button`
  margin: 0 1rem 0 1rem;
  display: inline-block;
  background: none;
  line-height: 4rem;
  cursor: pointer;
`;

const CalendarDayWrapper = styled.div`
  background-color: #ffea92;
`;

const CalendarWeek = styled.div`
  display: flex;
`;

const CalendarDay = styled.div<{ isDifferentMonth: boolean; hasTodo: boolean }>`
  position: relative;
  font-size: 2rem;
  flex: 1;
  padding: 0.5rem;
  aspect-ratio: 1;
  background: ${(props) => (props.isDifferentMonth ? "#fff0b3" : "#ffea92")};

  ::before {
    content: ${(props) => (props.hasTodo ? "''" : "none")};
    position: absolute;
    right: 0;
    bottom: 0;
    border-top: 15px solid #ffd27f;
    border-right: 15px solid transparent;
    background: #fceac9;
  }
`;
