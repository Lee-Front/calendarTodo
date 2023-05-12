import React from "react";
import styled from "@emotion/styled";

const PostIt = () => {
  return (
    <CalendarDayPost>
      <TestDiv dayTodoInfo={dayInfo.dayTodoInfo}>
        <span style={{ zIndex: "100", position: "relative" }}>
          {dayInfo.dayTodoInfo?.total}/{dayInfo.dayTodoInfo?.completed}
        </span>
      </TestDiv>
    </CalendarDayPost>
  );
};

export default PostIt;

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
  background: #ffda26;

  ::before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    border-top: 15px solid #ffd27f;
    border-right: 15px solid transparent;
  }
`;

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
