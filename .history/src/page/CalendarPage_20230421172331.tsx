import React from "react";
import TodoList from "../components/Todo/TodoList";
import TodoMenu from "../components/Todo/TodoMenu";
import styled from "@emotion/styled";

import Plus from "../images/plus.svg";
import Share from "../images/share.svg";
import Calendar from "../images/calendar.svg";

const CalendarPage = () => {
  const day = [];
  const currentDate = new Date();
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getDate(),
    0
  ).getDate();

  for (let i = 1; i <= lastDay; i++) {
    day.push(i);
  }
  return (
    <CalendarContainer>
      <CalendarMonthWrapper>4월</CalendarMonthWrapper>
      <CalendarDayWrapper>
        <CalendarDay></CalendarDay>
      </CalendarDayWrapper>
      {/* <MenuContainer>
        <MenuButton>
          <img src={Plus} />
        </MenuButton>
        <MenuGroup>
          <MenuButton>
            <img src={Calendar} />
          </MenuButton>
          <MenuButton>
            <img src={Share} />
          </MenuButton>
        </MenuGroup>
      </MenuContainer>
      <TodoListContainer></TodoListContainer> */}
    </CalendarContainer>
  );
};

export default CalendarPage;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CalendarMonthWrapper = styled.div`
  font-size: 4rem;
  text-align: center;
`;

const CalendarDayWrapper = styled.div`
  flex: 1;
`;

const CalendarDay = styled.div``;

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  padding: 1rem;
  background: #ffc965;
  border-bottom: 0.2rem solid white;
`;

const MenuGroup = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const MenuButton = styled.div`
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  img {
    height: 100%;
    width: 100%;
  }
`;

const TodoListContainer = styled.div`
  flex: 1;
`;
