import styled from "@emotion/styled";
import axios from "axios";
import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_URL } from "../../api/API";
import ImageContainer from "../../sub/ImageContainer";

interface ContestDetailProps {
  activityIdx: number;
  body: string;
  category: { categoryIdx: number; category: string }[];
  endTime: string;
  imageUrl: string;
  isFavorite: number;
  link: string;
  organizer: string;
  postCount: number;
  reward: string;
  startTime: string;
  target: string;
  title: string;
}

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
`;

const ContestExplain = styled.div`
  width: calc(100% - 400px);
  height: 100%;
  padding: 2%;
  .title {
    font-weight: 550;
  }
`;

const CategoryWrapper = styled.div`
  width: 100%;
  display: flex;
  .category_item {
    font-size: 0.75rem;
    padding: 0 0.4rem;
    height: 1.5rem;
    border-radius: 15px;
    color: #ffffff;
    background-color: #47d2d2;
    text-align: center;
    line-height: 1.5rem;
  }
`;
const ContentsBlock = styled.div`
  margin: 1rem 0;
  .info_row {
    display: flex;
    font-size: 0.875rem;
    margin: 0.5rem 0;
    .info_subTitle {
      font-size: 0.75rem;
      color: #aaaaaa;
      width: 5rem;
    }
  }
`;

const ContestDday = styled.div`
  font-size: 0.75rem;
  padding: 0 0.8rem;
  height: 1.5rem;
  border-radius: 15px;
  color: #ffffff;
  background-color: #aaaaaa;
  text-align: center;
  line-height: 1.5rem;
  margin-right: 1rem;
`;

const Introduction = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { contestIdx } = router.query;
  const [contestDetail, setContestDetail] = useState<ContestDetailProps>({
    activityIdx: null,
    body: "",
    category: [],
    endTime: "",
    imageUrl: "",
    isFavorite: null,
    link: "",
    organizer: "",
    postCount: null,
    reward: "",
    startTime: "",
    target: "",
    title: "",
  });
  const getContestDetail = async () => {
    try {
      const res = await axios.get(API_URL + `activities/${contestIdx}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      res.data.result.body = res.data.result.body.split("<img")[0];
      console.log(res.data.result);
      setContestDetail(res.data.result);
    } catch (err) {
      console.log(err.response);
    }
  };
  useEffect(() => {
    if (session?.user) getContestDetail();
  }, [session]);

  const diffDays = () => {
    return differenceInCalendarDays(
      new Date(parseISO(contestDetail.endTime)),
      new Date()
    );
  };
  const DateKor = (date) => {
    const parseDate = parseISO(date);
    const year = parseDate.getFullYear();
    const month = parseDate.getMonth() + 1;
    const day = parseDate.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };
  return (
    <Container>
      <ImageContainer
        fileName="contest"
        url={
          contestDetail.imageUrl.length > 0
            ? contestDetail.imageUrl
            : "https://res.cloudinary.com/linkareer/image/fetch/f_auto/https://api.linkareer.com/attachments/74832"
        }
        size={[350, 450]}
      />
      <ContestExplain>
        <CategoryWrapper>
          {contestDetail.category.map((cate, idx) => (
            <div className="category_item" key={`category_${idx}`}>
              {cate.category}
            </div>
          ))}
        </CategoryWrapper>
        <div className="title">{contestDetail.title}</div>
        <ContentsBlock>
          <div className="info_row">접수기간</div>
          <div className="info_row">
            <ContestDday>{`D-` + diffDays()}</ContestDday>
            <div>
              {DateKor(contestDetail.startTime)} ~{" "}
              {DateKor(contestDetail.endTime)}
            </div>
          </div>
        </ContentsBlock>
        <ContentsBlock>
          <div className="info_row">
            <div className="info_subTitle">기관</div> {contestDetail.organizer}
          </div>
        </ContentsBlock>
        <ContentsBlock>
          <div className="info_row">
            <div className="info_subTitle">시상</div> {contestDetail.reward}
          </div>
        </ContentsBlock>
        <ContentsBlock>
          <div className="info_row">본문</div>
          <div dangerouslySetInnerHTML={{ __html: contestDetail.body }} />
        </ContentsBlock>
      </ContestExplain>
    </Container>
  );
};

export default Introduction;
