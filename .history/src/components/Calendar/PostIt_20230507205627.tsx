import React from "react";
import styled from "@emotion/styled";
import { PostItProps, TodoInfo } from "../../types/calendarTypes";

const PostIt = ({ dayInfo, backgroundColor }: PostItProps) => {
  return (
    <CalendarDayPost>
      {dayInfo.day}
      <TodoProgress todoInfo={dayInfo.todoInfo}></TodoProgress>
      <PostFoldedEdge backgroundColor={backgroundColor}></PostFoldedEdge>
    </CalendarDayPost>
  );
};

export default PostIt;

const CalendarDayPost = styled.div`
  position: relative;
  font-size: 2rem;
  flex: 1;
  background-color: #ffda26;
  aspect-ratio: 1;
`;

const PostFoldedEdge = styled.div<{ backgroundColor: string }>`
  position: absolute;
  right: 0;
  bottom: 0;
  border-top: 15px solid #ffe36e;
  border-right: 15px solid ${(props) => props.backgroundColor};
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
    //position: absolute;
    display: block;
    text-indent: 0.4rem;
    color: #4c4c4c;
    font-weight: bold;
    margin-left: 0.5rem;
    box-sizing: border-box;
    width: ${(props) => (props?.todoInfo ? (props?.todoInfo.completed / props?.todoInfo.total) * 100 + "%" : "0%")};
    background-color: #6383bc;
  }
`;
