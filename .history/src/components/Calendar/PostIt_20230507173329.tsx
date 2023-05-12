import React from "react";
import styled from "@emotion/styled";
import { PostItProps, TodoInfo } from "../../types/calendarTypes";

const PostIt = ({ dayInfo, backgroundColor }: PostItProps) => {
  return (
    <CalendarDayPost backgroundColor={backgroundColor}>
      {dayInfo.day}
      <TodoProgress todoInfo={dayInfo.todoInfo}></TodoProgress>
    </CalendarDayPost>
  );
};

export default PostIt;

const CalendarDayPost = styled.div<{ backgroundColor: string }>`
  position: relative;
  font-size: 2rem;
  flex: 1;
  background-color: #ffda26;
  aspect-ratio: 1;

  ::before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    border-top: 15px solid #ffe36e;
    border-right: 15px solid ${(props) => props.backgroundColor};
  }
`;

const TodoProgress = styled.div<{ todoInfo?: TodoInfo }>`
  position: relative;
  width: 90%;
  height: 1.5rem;
  margin: auto;
  font-size: 1rem;
  line-height: 1rem;
  background: white;

  ::after {
    content: "${(props) => props.todoInfo && `${props?.todoInfo.completed}/${props?.todoInfo.total}`}";
    position: absolute;
    text-indent: 0.4rem;
    //color: #4c4c4c;
    color: #cecece;
    font-weight: bold;
    height: 1.1rem;
    top: 0;
    left: 0;
    margin: 0.2rem;
    box-sizing: border-box;
    width: ${(props) => (props?.todoInfo ? (props?.todoInfo.completed / props?.todoInfo.total) * 100 + "%" : "0%")};
    background-color: #6383bc;
  }

  :not(:-moz-root) {
    overflow: hidden;
  }

  ::after {
    color: red;
  }
`;
