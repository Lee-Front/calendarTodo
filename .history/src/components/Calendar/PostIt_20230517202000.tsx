import React, { useState } from "react";
import styled from "@emotion/styled";
import { PostItProps, TodoInfo, PostItColort } from "../../types/calendarTypes";
import Ellipsis from "../../images/ellipsis.svg";
import { BlockPicker } from "react-color";

const PostIt = ({ dayInfo, backgroundColor }: PostItProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [color, setColor] = useState({ r: 255, g: 218, b: 38 });

  const handleColorChange = (color: any) => {
    console.log(color);
    setColor(color.rgb);
  };
  return (
    <CalendarDayPost
      {...color}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setIsPickerOpen(false);
      }}
    >
      {dayInfo.day}
      {isHover && (
        <PostEllipsis
          onClick={(e) => {
            e.stopPropagation();
            if (e.target === e.currentTarget) {
              setIsPickerOpen((prev) => !prev);
            }
          }}
        >
          {isPickerOpen && (
            <PickerWrapper>
              <BlockPicker color={color} onChangeComplete={handleColorChange}></BlockPicker>
            </PickerWrapper>
          )}
        </PostEllipsis>
      )}

      <TodoProgress>
        <ProgressBar todoInfo={dayInfo.todoInfo}>
          {dayInfo.todoInfo?.completed}/{dayInfo.todoInfo?.total}
        </ProgressBar>
      </TodoProgress>
      <PostFoldedEdge {...color} backgroundColor={backgroundColor}></PostFoldedEdge>
    </CalendarDayPost>
  );
};

export default PostIt;

const CalendarDayPost = styled.div<{ r: number; g: number; b: number }>`
  position: relative;
  font-size: 2rem;
  flex: 1;
  padding: 0.5rem;
  background-color: ${(props) => `rgb(${props.r},${props.g},${props.b})`};
  aspect-ratio: 1;
`;

const PostEllipsis = styled.div`
  position: absolute;
  width: 1.5rem;
  height: 1.7rem;
  top: 0.3rem;
  right: 0;
  z-index: 1;
  background: url(${Ellipsis});
  background-repeat: no-repeat;
  background-position: center;
`;

const PostFoldedEdge = styled.div<{ backgroundColor: string; r: number; g: number; b: number }>`
  position: absolute;
  right: 0;
  bottom: 0;
  border-top: ${(props) => `2rem solid rgb(${props.r * 1.07},${props.g * 1.07},${props.b * 1.07})`};
  border-right: 2rem solid ${(props) => props.backgroundColor};
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

const PickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;
