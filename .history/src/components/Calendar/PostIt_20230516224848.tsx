import React, { useState } from "react";
import styled from "@emotion/styled";
import { PostItProps, TodoInfo } from "../../types/calendarTypes";
import Ellipsis from "../../images/ellipsis.svg";
import { BlockPicker } from "react-color";

const PostIt = ({ dayInfo, backgroundColor }: PostItProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <CalendarDayPost onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      {dayInfo.day}
      <PostEllipsis
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <BlockPicker></BlockPicker>
        </div>
      </PostEllipsis>
      <TodoProgress>
        <ProgressBar todoInfo={dayInfo.todoInfo}>
          {dayInfo.todoInfo?.completed}/{dayInfo.todoInfo?.total}
        </ProgressBar>
      </TodoProgress>
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

const PostEllipsis = styled.div`
  position: absolute;
  width: 1rem;
  height: 1.7rem;
  top: 0.3rem;
  right: 0;
  background: url(${Ellipsis});
  background-repeat: no-repeat;
  background-position: center;
`;

const PostFoldedEdge = styled.div<{ backgroundColor: string }>`
  position: absolute;
  right: 0;
  bottom: 0;
  border-top: 15px solid #ffe36e;
  border-right: 15px solid ${(props) => props.backgroundColor};
`;

const TodoProgress = styled.div`
  position: relative;
  width: 90%;
  height: 1.5rem;
  margin: auto;
  padding: 0.2rem;
  font-size: 1rem;
  line-height: 1rem;
  background: white;
`;

const ProgressBar = styled.div<{ todoInfo?: TodoInfo }>`
  display: flex;
  align-items: center;
  text-indent: 0.4rem;
  color: #4c4c4c;
  font-weight: bold;
  box-sizing: content-box;
  height: 100%;
  width: ${(props) => (props?.todoInfo ? (props?.todoInfo.completed / props?.todoInfo.total) * 100 + "%" : "0%")};
  background-color: #6383bc;
`;
