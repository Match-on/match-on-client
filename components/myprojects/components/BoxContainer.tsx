import styled from "@emotion/styled";
import React, { useState } from "react";
import { differenceInCalendarDays, format, parseISO } from "date-fns";

import TeamMember from "../../../public/myprojectSVG/TeamMember.svg";
import Favorite from "../../../public/myprojectSVG/Favorite.svg";
import { API_URL } from "../../api/API";
import axios from "axios";
import { useSession } from "next-auth/react";

const ProjectContainer = styled.div`
  width: 15.875rem;
  height: 18.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5%;
  background-color: white;
  border-radius: 1.25em;
  margin: 0 1.5rem 1.5rem 0;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
  .top {
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.5px solid #dcdcdc;
    .icon {
      cursor: pointer;
    }
  }
  .bottom {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .progress {
      width: 100%;
      height: 5px;
      background: #c4c4c4;
      border-radius: 1rem;
      .highlight {
        background: #47d2d2;
        height: 5px;
        border-radius: 1rem;
      }
    }
  }
`;

const ContentsBox = styled.div<{ selected: boolean }>`
  height: 18.75em;
  margin: 2% 3% 2% 3%;
  background-color: white;
  border-radius: 1.25em;
  padding: 1em;
  box-shadow: ${(props) => (props.selected ? "0px 0px 10px rgba(0, 0, 0, 0.3)" : "")};
`;

const Title = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 2%;
`;

const Subject = styled.div`
  font-size: 0.875em;
  font-weight: 400;
  color: #a0a0a0;
`;

const Describe = styled.div`
  width: 100%;
  height: 35%;
  padding: 4%;
  color: #8f8f8f;
  font-size: 0.75rem;
  font-weight: 400;
  background: #eaeaea;
  border-radius: 0.625em;
`;

const Board = styled.div`
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const memberColor = ["#ffe8ea", "#f2c7f9", "#c7c7c7", "#9be5e5"];

export const ProjectBox = (props) => {
  const [favorite, setFavorite] = useState(props.favorite);
  const { data: session, status } = useSession();
  const diffDays = () => {
    const entire = differenceInCalendarDays(
      new Date(format(parseISO(props.deadline), "MM/dd/yyyy")),
      new Date(format(parseISO(props.createdAt), "MM/dd/yyyy"))
    );
    const today = differenceInCalendarDays(new Date(), new Date(format(parseISO(props.createdAt), "MM/dd/yyyy")));
    return today / entire;
  };
  const appendFavorite = async (e) => {
    e.preventDefault();
    setFavorite(1);
    axios
      .post(
        API_URL + "teams/favorites",
        { teamIdx: props.teamIdx },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      )
      .then((res) => console.log(res));
  };
  const deleteFavorite = async (e) => {
    e.preventDefault();
    setFavorite(0);
    axios
      .delete(API_URL + `teams/favorites/${props.teamIdx}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((res) => console.log(res));
  };
  return (
    <ProjectContainer>
      <div className="top">
        <div>
          <Title>{props.name}</Title>
          <Subject>{props.type}</Subject>
        </div>
        <div className="icon" onClick={favorite ? deleteFavorite : appendFavorite}>
          <Favorite fill={favorite ? "#47d2d2" : "white"} stroke={favorite ? "#47d2d2" : "#aaaaaa"} />
        </div>
      </div>
      <Describe>{props.description}</Describe>
      <div className="bottom">
        <div>
          {new Array(props.memberCount).fill(1).map((mem, index) => (
            <TeamMember
              fill={memberColor[index]}
              key={`${props.teamIdx}${index}`}
              style={{ position: "relative", left: `${-13 * index}px` }}
            />
          ))}
        </div>
        <div className="progress">
          <div className="highlight" style={{ width: `${diffDays() * 100}%` }}></div>
        </div>
        <div style={{ fontSize: "0.75rem", color: "#a6a6a6" }}>
          팀 생성일: {format(parseISO(props.createdAt), "yyyy.MM.dd")}
        </div>
      </div>
    </ProjectContainer>
  );
};

export const ClassBox = ({ className, classfication, professor, grade, time, selected }) => {
  return (
    <ContentsBox selected={selected}>
      <Title>{className}</Title>
      <Subject>{classfication}</Subject>
      <Describe style={{ height: "30%" }}>
        <div>교수님 {professor}</div>
        <div>학점 {grade}</div>
        <div>시간 {time}</div>
      </Describe>
      <Board>
        <div style={{ fontSize: "0.625rem" }}>게시판</div>
        <div>자유게시판</div>
        <div>정보공유게시판</div>
        <div>팀원모집게시판</div>
      </Board>
    </ContentsBox>
  );
};

export const ContestBox = ({ title, category, deadline, seen, comments, imgsrc, selected }) => {
  return (
    <ContentsBox selected={selected}>
      <img src={imgsrc} width={150} height={150} />
      <div>{category}</div>
      <div>{title}</div>
      <div>{deadline}</div>
      <div>{seen}</div>
      <div>{comments}</div>
    </ContentsBox>
  );
};

export const StudyBox = (props) => {
  console.log(props);

  return <ContentsBox selected={props.selected}></ContentsBox>;
};
