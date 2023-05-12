import React, { useState } from "react";
import styled from "@emotion/styled";
import { CalendarDayInfo } from "types/calendarTypes";

const DayList = (currentDate: Date) => {
  const [dayInfos, setDayInfos] = useState<CalendarDayInfo[]>([]);
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
                  {/* {dayInfo.dayTodoInfo ? (
                <CalendarDayPost>
                  <TestDiv dayTodoInfo={dayInfo.dayTodoInfo}>
                    <span style={{ zIndex: "100", position: "relative" }}>
                      {dayInfo.dayTodoInfo?.total}/
                      {dayInfo.dayTodoInfo?.completed}
                    </span>
                  </TestDiv>
                </CalendarDayPost>
              ) : null} */}
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
