import React, { useState } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";

import Search from "./Search";

import styled from "@emotion/styled";

//pagination 추가

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody`
  width: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const Tablerow = styled.tr<{ selected: boolean }>`
  width: 100%;
  height: 88px;
  background-color: ${(props) => (props.selected ? "rgba(242, 246, 246, 0.5)" : "#ffffff")};
`;

const TableRow1 = ({ row, index, select, handleRow }) => {
  return (
    <Tablerow {...row.getRowProps()} onClick={() => handleRow(index)} selected={index === select}>
      {row.cells.map((cell) => (
        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
      ))}
    </Tablerow>
  );
};

const TableComponent = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy
  );

  const [select, setSelect] = useState(-1);

  const handleClickedRow = (index) => {
    console.log(index);
    setSelect(index);
  };

  return (
    <TableContainer>
      <Search onSubmit={setGlobalFilter} />
      <Table {...getTableProps()}>
        {/* <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead> */}
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <TableRow1 row={row} index={index} select={select} handleRow={handleClickedRow} key={`row-${index}`} />
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
