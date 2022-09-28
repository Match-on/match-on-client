import styled from "@emotion/styled";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_URL } from "../api/API";

interface Noti {
  index: number;
  type: string;
  writer: string;
  createdAt: string;
}

const noticeType = {
  note: "notes",
  notice: "notices",
  vote: "votes",
};

const RowWrapper = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  cursor: pointer;
  &:hover {
    background: rgba(242, 246, 246, 0.5);
  }
`;
const ColWrapper = styled.div<{ width: number; isTitle?: boolean }>`
  height: 100%;
  width: ${(props) => `${props.width}%`};
  font-size: 0.75rem;
  color: ${(props) => (props.isTitle ? "#000000" : "#aaaaaa")};
  display: flex;
  align-items: center;
`;

const NotiRow = ({ idx, notiRow }) => {
  const { data: session, status } = useSession();
  const [rowInfo, setRowInfo] = useState(null);

  const getNotiDetail = async () => {
    const apiUrl = `teams/${noticeType[notiRow.type]}`;
    try {
      const res = await axios.get(API_URL + `${apiUrl}/${notiRow.index}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      console.log(res.data.result);
      setRowInfo(res.data.result);
    } catch (err) {
      console.log(err.response);
    }
  };
  useEffect(() => {
    if (session?.user) getNotiDetail();
  }, [session]);
  return (
    <RowWrapper>
      <ColWrapper width={60} isTitle={true}>
        {rowInfo?.title}
      </ColWrapper>
      <ColWrapper width={20}>{notiRow.writer}</ColWrapper>
      <ColWrapper width={20}>
        {format(parseISO(notiRow.createdAt), "yyyy.MM.dd")}
      </ColWrapper>
    </RowWrapper>
  );
};

const RecentAlarm = ({ noti }: { noti: Noti[] }) => {
  const router = useRouter();
  const { projectIdx } = router.query;
  return (
    <>
      {noti.map((v, i) => (
        <Link
          key={`recent_${i}`}
          href={`/myproject/${projectIdx}/${noti[i].index}?tabNum=0`}
        >
          <a>
            <NotiRow idx={i} notiRow={v} />
          </a>
        </Link>
      ))}
    </>
  );
};

export default RecentAlarm;
