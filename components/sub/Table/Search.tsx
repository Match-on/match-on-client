import React from "react";

import styled from "@emotion/styled";

const Form = styled.form`
  width: 50%;
  height: 80%;
  padding: 0 0 0 1.25rem;
  display: inline-block;
`;

const Input = styled.input`
  width: 100%;
  height: 80%;
  padding: 1.25rem 0 1.25rem 0;
  border: none;
  border-radius: 0.188rem;
  background-color: #f2f6f6;
  &:focus {
    outline: none;
    border: 0.188rem solid #51d5d6;
  }
`;

const SearchButton = styled.button`
  width: 6%;
  height: 70%;
  background-color: #47d2d3;
  color: #ffffff;
`;

function Search({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event.target.elements.filter.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="filter" placeholder=" 검색" />
      {/* <SearchButton>검색</SearchButton> */}
    </Form>
  );
}

export default Search;
