import React, { useEffect, useState } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";

import Search from "./Search";

import styled from "@emotion/styled";
import MeetingOutputModal from "../../myprojects/tabmenu/TabContents/Output/MeetingOutput";
import NoticeOutputModal from "../../myprojects/tabmenu/TabContents/Output/NoticeOutput";
import VoteOutputModal from "../../myprojects/tabmenu/TabContents/Output/VoteOutput";
import { useAppDispatch } from "../../../src/hooks/hooks";
import { selectRow } from "../../../src/redux/reducers/tableRow";

//pagination 추가

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 93.5%;
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
  height: 5.5em;
  background-color: ${(props) => (props.selected ? "rgba(242, 246, 246, 0.5)" : "#ffffff")};
  &:hover {
    background-color: rgba(242, 246, 246, 0.5);
  }
  cursor: pointer;
`;

const TableHeader = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: auto;
`;

const UploadButton = styled.div`
  width: 6.813rem;
  height: 2.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  line-height: 1.375rem;
  color: #ffffff;
  background-color: #47d2d2;
  border-radius: 0.625rem;
  cursor: pointer;
`;

const RowComponent = ({ row, index, select, handleRow }) => {
  return (
    <Tablerow {...row.getRowProps()} onClick={() => handleRow(index)} selected={index === select}>
      {row.cells.map((cell) => (
        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
      ))}
    </Tablerow>
  );
};

const TableComponent = ({ columns, data, handleInputOpen, upload }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy
  );
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [rowInfo, setRowInfo] = useState({ class: "", index: -1, id: "" });

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClickedRow = (row, index) => {
    handleOpen();
    setRowInfo({ class: row.original.class, index: index, id: row.original.id });
  };
  useEffect(() => {
    dispatch(selectRow(rowInfo));
    console.log(rowInfo);
  }, [rowInfo]);

  return (
    <>
      <TableContainer>
        <TableHeader>
          <Search onSubmit={setGlobalFilter} />
          {upload === "" ? <div /> : <UploadButton onClick={handleInputOpen}>{upload}</UploadButton>}
        </TableHeader>
        <Table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <RowComponent
                  row={row}
                  index={index}
                  select={rowInfo.index}
                  handleRow={() => handleClickedRow(row, index)}
                  key={`row-${index}`}
                />
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {/* {isOpen && rowInfo.class == "meeting" && (
        <MeetingOutputModal isOpen={isOpen} handleOpen={handleOpen} id={rowInfo.id} />
      )}
      {isOpen && rowInfo.class == "notice" && (
        <NoticeOutputModal isOpen={isOpen} handleOpen={handleOpen} id={rowInfo.id} />
      )}
      {isOpen && rowInfo.class == "vote" && <VoteOutputModal isOpen={isOpen} handleOpen={handleOpen} id={rowInfo.id} />} */}
    </>
  );
};

export default TableComponent;
