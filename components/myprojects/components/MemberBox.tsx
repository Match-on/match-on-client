import React from "react";
import styled from "@emotion/styled";

//17.875em 17.438em

const Container = styled.div`
  width: 16.8rem;
  height: 16.5rem;
  margin: 1.8rem 1.5rem;
  padding: 2%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 0px 0px 0.625em rgba(0, 0, 0, 0.25);
  border-radius: 1.25rem;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    margin: 1rem 1rem;
  }
`;

const Identity = styled.div`
  height: 48%;
  width: 100%;
  border-bottom: 0.031rem solid #dcdcdc;
`;

const TodoList = styled.div`
  width: 100%;
  height: 48%;
  background-color: #f2f6f6;
  border-radius: 0.625rem;
`;

const MemberBox = ({ name, school, list }) => {
  return (
    <Container>
      <Identity>
        <div>{name}</div>
        <div>{school}</div>
      </Identity>
      <TodoList>
        {list.map((v, i) => (
          <div key={`list-${i}`}>-{v}</div>
        ))}
      </TodoList>
    </Container>
  );
};

export default MemberBox;
