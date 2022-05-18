import styled from "@emotion/styled";
import React from "react";

const BoxContainer = styled.div`
  width: 15.875em;
  height: 18.75em;
  display: flex;
  margin-bottom: 1.25em;
  cursor: pointer;
`;

const BoxContent = styled.div`
  width: 13.75em;
  height: 18.75em;
  margin: auto;
  background-color: white;
  border-radius: 1.25em;
  padding: 1em;
`;

const Title = styled.div`
  font-size: 1em;
  font-weight: 400;
`;

const Subject = styled.div`
  font-size: 0.875em;
  font-weight: 400;
  color: lightgray;
`;

const Describe = styled.div`
  width: 100%;
  height: 7em;
  font-size: 0.75rem;
  font-weight: 400;
  background: #eaeaea;
  border-radius: 0.625em;
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
