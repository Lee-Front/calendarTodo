import React from "react";
import TodoList from "../components/Todo/TodoList";
import TodoMenu from "../components/Todo/TodoMenu";
import styled from "@emotion/styled";

import Plus from "../images/plus.svg";
import Share from "../images/share.svg";
import Calendar from "../images/calendar.svg";
import { useNavigate } from "react-router-dom";

const CalendarPage = () => {
  const nav = useNavigate();
  const days = [];
  const currentDate = new Date();

  const firstDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const lastDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  console.log("f day : ", firstDate.getDay());

  //
  for (let i = 0; i < firstDate.getDay(); i++) {
    days.push(i);
  }

  for (let i = 0; i < lastDate.getDay(); i++) {
    days.push(i);
  }

  return (
    <CalendarContainer>
      <CalendarMonthWrapper>4월</CalendarMonthWrapper>
      <CalendarDayWrapper>
        <CalendarWeek>
          {days.map((day) => (
            <CalendarDay
              key={day}
              onClick={() => {
                nav("/", { state: { direction: "left" } });
              }}
            >
              {day}
            </CalendarDay>
          ))}
        </CalendarWeek>
        {/* <CalendarWeek>
          <CalendarDay
            onClick={() => {
              nav("/", { state: { direction: "left" } });
            }}
          >
            1
          </CalendarDay>
          <CalendarDay>2</CalendarDay>
          <CalendarDay>3</CalendarDay>
          <CalendarDay>4</CalendarDay>
          <CalendarDay>5</CalendarDay>
          <CalendarDay>6</CalendarDay>
          <CalendarDay>7</CalendarDay>
        </CalendarWeek>
        <CalendarWeek>
          <CalendarDay>1</CalendarDay>
          <CalendarDay>2</CalendarDay>
          <CalendarDay>3</CalendarDay>
          <CalendarDay>4</CalendarDay>
          <CalendarDay>5</CalendarDay>
          <CalendarDay>6</CalendarDay>
          <CalendarDay>7</CalendarDay>
        </CalendarWeek>
        <CalendarWeek>
          <CalendarDay>1</CalendarDay>
          <CalendarDay>2</CalendarDay>
          <CalendarDay>3</CalendarDay>
          <CalendarDay>4</CalendarDay>
          <CalendarDay>5</CalendarDay>
          <CalendarDay>6</CalendarDay>
          <CalendarDay>7</CalendarDay>
        </CalendarWeek>
        <CalendarWeek>
          <CalendarDay>1</CalendarDay>
          <CalendarDay>2</CalendarDay>
          <CalendarDay>3</CalendarDay>
          <CalendarDay>4</CalendarDay>
          <CalendarDay>5</CalendarDay>
          <CalendarDay>6</CalendarDay>
          <CalendarDay>7</CalendarDay>
        </CalendarWeek> */}
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

const CalendarDay = styled.div`
  font-size: 2rem;
  padding-left: 0.5rem;
  flex: 1;
  aspect-ratio: 1;
  background: #ffdea2;
`;
