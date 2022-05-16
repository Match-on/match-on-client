import React from "react";

import styled from "@emotion/styled";

const Form = styled.form`
  width: 100%;
  height: 40px;
  padding: 20px 20px 30px 20px;
`;

const Input = styled.input`
  width: 50%;
  height: 100%;
  padding: 20px 0 20px 0;
  border: none;
  border-radius: 3px;
  background-color: #f2f6f6;
  &:focus {
    outline: none;
    border: 3px solid #51d5d6;
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
