import styled from "@emotion/styled";
import React, { useState } from "react";
import { differenceInCalendarDays, format, parseISO } from "date-fns";

import TeamMember from "../../../public/myprojectSVG/TeamMember.svg";
import Favorite from "../../../public/myprojectSVG/Favorite.svg";
import Comment from "../../../public/componentSVG/table/comment.svg";
import Seen from "../../../public/componentSVG/table/seen.svg";
import { API_URL } from "../../api/API";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 2% 3% 2% 3%;
  background-color: white;
  border-radius: 1.25em;
  padding: 5%;
  box-shadow: ${(props) => (props.selected ? "0px 0px 10px rgba(0, 0, 0, 0.3)" : "")};
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
  .title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 15%;
    border-bottom: 0.5px solid #dcdcdc;
  }
  .study_top {
    height: 12%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .icon {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      cursor: pointer;
    }
  }
  .study_content {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 0.875rem;
    .info_row {
      display: flex;
      .row_title {
        color: #a6a6a6;
        margin-right: 0.5rem;
      }
    }
  }
  .study_info {
    width: 100%;
    height: 23%;
    display: flex;
    align-items: center;
    > span {
      font-size: 0.75rem;
      margin-left: 0.4rem;
      margin-right: 0.9rem;
    }
  }
`;

const Title = styled.div`
  font-size: 1em;
  font-weight: 400;
`;

const Subject = styled.div`
  font-size: 0.875em;
  font-weight: 400;
  color: #a0a0a0;
`;

const Describe = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  padding: 4%;
  color: #a6a6a6;
  font-size: 0.875rem;
  font-weight: 400;
  background: #eaeaea;
  border-radius: 0.625em;
  .class_content {
    width: 100%;
    display: flex;
    .descriptionTitle {
      width: 5rem;
    }
    .descriptionDetail {
      color: #000000;
    }
  }
`;

const Board = styled.div`
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 0.875rem;
  .circle {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    background: #47d2d2;
    margin-right: 5px;
  }
  .boardLink {
    display: flex;
    align-items: center;
    &:hover {
      font-weight: 600;
    }
  }
`;
const TagWrapper = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
`;
const Tag = styled.div<{ background: string }>`
  min-width: 3rem;
  height: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.3rem;
  padding: 0 0.2rem;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 300;
  border-radius: 1rem;
  background: ${(props) => props.background};
`;

const memberColor = ["#ffe8ea", "#f2c7f9", "#c7c7c7", "#9be5e5"];

export const ProjectBox = (props) => {
  const [favorite, setFavorite] = useState(props.favorite);
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(props);

  const diffDays = () => {
    const entire = differenceInCalendarDays(new Date(parseISO(props.deadline)), new Date(parseISO(props.createdAt)));
    const today = differenceInCalendarDays(new Date(), new Date(parseISO(props.createdAt)));
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
      .then((res) => console.log("append", res));
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
              fill={memberColor[index % 4]}
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

export const ClassBox = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [favorite, setFavorite] = useState<boolean>(true);

  const deleteFavorite = async (e) => {
    e.preventDefault();
    axios
      .delete(API_URL + `lectures/favorites/${props.lectureIdx}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      .then((res) => console.log(res));
  };

  const boardRouting = (tab) => {
    router.push(`/classboard/${props.lectureIdx}?tabnum=${tab}`);
  };
  return (
    <ContentsBox selected={props.select}>
      <div className="study_top">
        <div>
          <Title>{props.name}</Title>
          <Subject>{props.type}</Subject>
        </div>
        <Favorite
          className="icon"
          onClick={(e) => {
            deleteFavorite(e);
            setFavorite(!favorite);
          }}
          fill={favorite ? "#47d2d2" : "none"}
          stroke={favorite ? "#47d2d2" : "white"}
        />
      </div>
      <Describe>
        <div className="class_content">
          <span className="descriptionTitle">교수님</span>
          <span className="descriptionDetail">{props.instructor}</span>
        </div>
        <div className="class_content">
          <span className="descriptionTitle">학점</span>
          <span className="descriptionDetail">{props.credit}</span>
        </div>
        <div className="class_content">
          <span className="descriptionTitle">시간</span>
          <span className="descriptionDetail">{props.time}</span>
        </div>
      </Describe>
      <Board>
        <div style={{ fontSize: "0.625rem", color: "#aaaaaa" }}>게시판</div>
        <div className="boardLink" onClick={() => boardRouting(0)}>
          <div className="circle" />
          자유게시판
        </div>
        <div className="boardLink" onClick={() => boardRouting(1)}>
          <div className="circle" />
          정보공유게시판
        </div>
        <div className="boardLink" onClick={() => boardRouting(2)}>
          <div className="circle" />
          팀원모집게시판
        </div>
      </Board>
    </ContentsBox>
  );
};
// credit: number;
// instructor: string;
// lectureIdx: number;
// name: string;
// time: string;
// type: string;

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
  const [favorite, setFavorite] = useState<boolean>(true);
  const { data: session, status } = useSession();

  const appendFavorite = async (e) => {
    await e.preventDefault();
    try {
      const res = await axios.post(
        API_URL + "studies/favorites",
        { studyIdx: props.studyIdx },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      setFavorite(true);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteFavorite = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(API_URL + `studies/favorites/${props.studyIdx}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      setFavorite(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ContentsBox selected={props.selected}>
      <div className="study_top">
        <TagWrapper>
          <Tag background="#47d2d2">모집중</Tag>
          <Tag background="#c4c4c4">{props.category}</Tag>
        </TagWrapper>
        <div className="icon" onClick={favorite ? deleteFavorite : appendFavorite}>
          <Favorite fill={favorite ? "#47d2d2" : "white"} stroke={favorite ? "#47d2d2" : "#aaaaaa"} />
        </div>
      </div>
      <div className="title">{props.title}</div>
      <div className="study_content">
        <div className="info_row">
          <span className="row_title">분야</span>
          <span>{props.category}</span>
        </div>
        <div className="info_row">
          <span className="row_title">지역</span>
          <span>{props.region}</span>
        </div>
        <div className="info_row">
          <span className="row_title">인원</span>
          <span>{props.count}명</span>
        </div>
      </div>
      <div className="study_info">
        <Seen />
        <span>{props.hitCount}</span>
        <Comment />
        <span>{props.commentCount}</span>
      </div>
    </ContentsBox>
  );
};
