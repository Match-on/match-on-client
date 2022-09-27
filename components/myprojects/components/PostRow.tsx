import styled from "@emotion/styled";
import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
  format,
  parseISO,
} from "date-fns";
import SurveyIcon from "../../../public/componentSVG/survey/survey.svg";
import DownloadIcon from "../../../public/myprojectSVG/Cloud_Download.svg";
import ChatIcon from "../../../public/myprojectSVG/Chat_Circle.svg";
import ShareIcon from "../../../public/myprojectSVG/Share_Export.svg";

interface VoteProps {
  count: string;
  endTime: string;
  isNew: number;
  title: string;
  voteIdx: number;
  key: number;
}
interface MeetingProps {
  commentCount: string;
  createdAt: string;
  files: string[];
  isNew: number;
  name: string;
  noteIdx: number;
  title: string;
}
interface DriveProps {
  commentCount: string;
  createdAt: string;
  files: string[];
  isNew: number;
  name: string;
  driveIdx: number;
  title: string;
}
const Row = styled.div`
  width: 100%;
  height: calc(100% / 6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1% 2%;
  border-bottom: 0.25px solid #dcdcdc;
  cursor: pointer;
  &:hover {
    border-left: 4px solid #47d2d2;
    background: rgba(242, 246, 246, 0.5);
  }
`;

const Column = styled.div<{ width: number }>`
  height: 100%;
  width: ${(props) => props.width + "%"};
  font-size: 0.75rem;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #a6a6a6;
  .mint_color {
    color: #47d2d2;
  }
  .gray_color {
    color: #a6a6a6;
  }
  .icon_wrapper {
    display: flex;
    justify-content: center;
    width: 3rem;
  }
  @media screen and (max-width: 700px) {
    display: none;
  }
`;
const TitleCol = styled(Column)`
  align-items: flex-start;
  flex-direction: column;
  color: #000000;
  @media screen and (max-width: 700px) {
    display: flex;
    width: 100%;
  }
  .col_title {
    font-size: 1rem;
    margin-bottom: 0.3rem;
    display: flex;
    align-items: center;
    .vote_is_new {
      width: 3.5rem;
      height: 1.3rem;
      text-align: center;
      line-height: 1.3rem;
      border-radius: 10px;
      background: #47d2d2;
      color: #ffffff;
      margin-left: 1rem;
    }
    .col_is_new {
      width: 3.5rem;
      height: 1.4rem;
      border-radius: 10px;
      background: #47d2d2;
      text-align: center;
      line-height: 1.4rem;
      color: #ffffff;
      margin-left: 1rem;
    }
  }
  .col_date {
    font-size: 0.75rem;
    color: #9b9b9b;
  }
`;
export const VoteRow = (props: VoteProps) => {
  const [count, entire] = props.count.split("/");

  return (
    <Row>
      <Column width={15} style={{ minWidth: "100px" }}>
        <SurveyIcon fill={props.isNew ? "#47d2d2" : "#aaaaaa"} />
      </Column>
      <TitleCol width={70}>
        <div className="col_title">
          {props.title}
          {props.isNew && <div className="vote_is_new">new</div>}
        </div>
        <div className="col_date">
          마감일 {format(parseISO(props.endTime), "yyyy-MM-dd")}
        </div>
      </TitleCol>
      <Column width={15}>
        <p className="mint_color">{count}</p> <div>&nbsp;/&nbsp;</div>{" "}
        <p className="gray_color">{entire}</p>
      </Column>
    </Row>
  );
};

export const MeetingRow = (props: MeetingProps) => {
  const getDateDifference = () => {
    const diff = differenceInMinutes(
      new Date(),
      new Date(parseISO(props.createdAt))
    );
    if (diff / 60 >= 1 && diff / 60 < 24) {
      return `${Math.floor(diff / 60)} 시간 전`;
    }
    if (diff / 60 >= 24) {
      return `${Math.floor(diff / 1440)} 일 전`;
    }
    if (diff >= 1 && diff / 60 < 1) {
      return `${diff} 분 전`;
    }
    if (diff < 1) {
      return `방금 전`;
    }
  };
  return (
    <Row>
      <TitleCol width={50}>
        <div className="col_title">
          {props.title}
          {props.isNew === 1 && <div className="col_is_new">new</div>}
        </div>
        <div className="col_date">{getDateDifference()}</div>
      </TitleCol>
      <Column width={10}>{props.name}</Column>
      <Column width={20}>
        {format(parseISO(props.createdAt), "yyyy.MM.dd")}
      </Column>
      <Column width={20}>
        <div className="icon_wrapper">
          <DownloadIcon />
        </div>
        <div className="icon_wrapper">
          <ChatIcon />
        </div>
        <div className="icon_wrapper">
          <ShareIcon />
        </div>
      </Column>
    </Row>
  );
};

export const NoticeRow = (props) => {
  console.log(props);

  return (
    <Row>
      <TitleCol width={70}>
        <div className="col_title">
          {props.title}
          {props.isNew === 1 && <div className="col_is_new">new</div>}
        </div>
      </TitleCol>
      <Column width={10} className="gray_color">
        {props.name}
      </Column>
      <Column width={20}>
        {format(parseISO(props.createdAt), "yyyy.MM.dd")}
      </Column>
    </Row>
  );
};

export const DriveRow = (props: DriveProps) => {
  const getDateDifference = () => {
    const diff = differenceInMinutes(
      new Date(),
      new Date(parseISO(props.createdAt))
    );
    if (diff / 60 >= 1 && diff / 60 < 24) {
      return `${Math.floor(diff / 60)} 시간 전`;
    }
    if (diff / 60 >= 24) {
      return `${Math.floor(diff / 1440)} 일 전`;
    }
    if (diff >= 1 && diff / 60 < 1) {
      return `${diff} 분 전`;
    }
    if (diff < 1) {
      return `방금 전`;
    }
  };
  return (
    <Row>
      <TitleCol width={50}>
        <div className="col_title">
          {props.title}
          {props.isNew === 1 && <div className="col_is_new">new</div>}
        </div>
        <div className="col_date">{getDateDifference()}</div>
      </TitleCol>
      <Column width={10}>{props.name}</Column>
      <Column width={20}>
        {format(parseISO(props.createdAt), "yyyy.MM.dd")}
      </Column>
      <Column width={20}>
        <div className="icon_wrapper">
          <DownloadIcon />
        </div>
        <div className="icon_wrapper">
          <ChatIcon />
        </div>
        <div className="icon_wrapper">
          <ShareIcon />
        </div>
      </Column>
    </Row>
  );
};
