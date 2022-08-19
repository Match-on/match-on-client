import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "../../../src/hooks/useIntersectionObserver";
import { API_URL } from "../../api/API";
import FavoriteIcon from "../../../public/myprojectSVG/Favorite.svg";

const Row = styled.div`
  font-family: "Noto Sans";
  width: 100%;
  min-height: 3.875rem;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1%;
  &:hover {
    border-left: 3px solid #47d2d2;
    cursor: pointer;
  }
`;

const Column = styled.div<{ width: number }>`
  height: 100%;
  width: ${(props) => props.width + "%"};
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Prefix = styled.span`
  padding-right: 0.5rem;
  font-size: 0.84rem;
  color: #a6a6a6;
  font-weight: 400;
`;

// const appendFavorite = async () => {
//   try {
//     const response = await axios.get(API_URL + "lectures/search", {
//       headers: {
//         Authorization: `Bearer ${session.accessToken}`,
//       },
//     });
//   } catch (err) {
//     alert("수업 데이터 로딩 실패");
//   }
// };

// const deleteFavorite = () => {};

const ResultRow = (props) => {
  const { data: session, status } = useSession();
  const [favorite, setFavorite] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null); // 감시할 엘리먼트
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;
  console.log("test props", props);
  useEffect(() => {
    setFavorite(props.favorite);
  }, []);
  const appendFavorite = async (e) => {
    await e.preventDefault();
    axios
      .post(
        API_URL + "lectures/favorites",
        { lectureIdx: props.lectureIdx },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then(() => setFavorite(1))
      .catch((err) => console.log(err));
  };

  const deleteFavorite = async (e) => {
    e.preventDefault();
    axios
      .delete(API_URL + `lectures/favorites/${props.lectureIdx}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then(() => setFavorite(0));
  };

  const getSearchResult = async () => {
    const params = {
      keyword: props.filter.keyword,
      type: props.filter.type,
      grade: props.filter.grade,
      year: props.filter.year,
      semester: props.filter.semester,
      offset: props.page * 10,
    };
    try {
      const response = await axios.get(API_URL + "lectures/search", {
        params: params,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      props.setPage();
      const searchedClass = response.data.result;
      props.setSearchResult((prev) => [...prev, ...searchedClass]);
    } catch (err) {
      alert("수업 데이터 로딩 실패");
    }
  };

  useEffect(() => {
    props.isLastItem && isIntersecting && getSearchResult(); // 목록의 마지막에 도달했을 때, 리스트를 더 불러오도록 요청한다.
  }, [props.isLastItem, isIntersecting]);

  return (
    //2퍼 남
    <Row ref={ref}>
      <Column width={4}>
        <FavoriteIcon
          onClick={favorite ? deleteFavorite : appendFavorite}
          fill={favorite === 1 ? "#47d2d2" : "white"}
          stroke={favorite === 1 ? "#47d2d2" : "#aaaaaa"}
        />
      </Column>
      <Column width={21} style={{ fontSize: "1rem" }}>
        {props.name}
      </Column>
      <Column width={18}>
        <Prefix>{props.type}</Prefix>
        {/* {props.department} */}
        산업보안학과
      </Column>
      <Column width={12}>
        <Prefix>교수님</Prefix>
        {props.instructor}
      </Column>
      <Column width={8}>
        <Prefix>학년</Prefix>
        {props.grade}
      </Column>
      <Column width={8}>
        <Prefix>학점</Prefix>
        {props.credit}
      </Column>
      <Column width={16}>
        <Prefix>년도/학기</Prefix>
        {props.year}/{props.semester}
      </Column>
      <Column width={11}>
        <Prefix>시간</Prefix>
        {props.time}
      </Column>
    </Row>
  );
};

export default ResultRow;
// credit: 2
// department: null
// favorite: 0
// grade: 0
// instructor: "도선재"
// lectureIdx: 1615
// name: "ACT"
// semester: 1
// time: "월5,6"
// type: "교양"
// year: 2022
