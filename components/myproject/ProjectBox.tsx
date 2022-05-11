import styled from "@emotion/styled";
import React from "react";

const BoxContainer = styled.div`
  width: 254px;
  height: 300px;
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
`;

const BoxContent = styled.div`
  width: 220px;
  height: 300px;
  margin: auto;
  background-color: white;
  border-radius: 20px;
  padding: 15px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 400;
`;

const Subject = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: lightgray;
`;

const Describe = styled.div`
  width: 100%;
  height: 93px;
  font-size: 12px;
  font-weight: 400;
  background: #eaeaea;
  border-radius: 10px;
`;

export default function ProjectBox({ title, subject, describe, deadline }) {
  return (
    <BoxContainer>
      <BoxContent>
        <Title>{title}</Title>
        <Subject>{subject}</Subject>
        <Describe>{describe}</Describe>
      </BoxContent>
    </BoxContainer>
  );
}
