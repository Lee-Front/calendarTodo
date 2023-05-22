import React from "react";
import styled from "@emotion/styled";
import Plus from "../../images/plus.svg";
import Calendar from "../../images/calendar.svg";
import { useNavigate } from "react-router-dom";
import { TodoMenuProps } from "types/todoTypes";
import { rgbColor } from "../../types/commonTypes";

const TodoMenu = ({ addTodo, postItColor }: TodoMenuProps) => {
  const nav = useNavigate();
  return (
    <MenuContainer postItColor={postItColor}>
      <MenuButton
        onClick={() => {
          addTodo();
        }}
      >
        <img src={Plus} />
      </MenuButton>
      <MenuGroup>
        <MenuButton
          onClick={() => {
            nav("/", {
              state: { direction: "right", date: { year: 2023, month: 4 } },
            });
          }}
        >
          <img src={Calendar} />
        </MenuButton>
      </MenuGroup>
    </MenuContainer>
  );
};

export default TodoMenu;

const MenuContainer = styled.div<{ postItColor: rgbColor }>`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  padding: 1rem;
  //background: #ffc965;
  background: ${({ postItColor }) => `${postItColor.r},${postItColor.g},${postItColor.b}`};
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
