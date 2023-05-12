import React from "react";
import steyld from "@emotion/styled";

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
