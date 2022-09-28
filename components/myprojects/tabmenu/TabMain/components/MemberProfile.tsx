import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import ImageContainer from "../../../../sub/ProfileImage";

interface Member {
  memberIdx: number;
  profileUrl: string;
  name: string;
  detail: string;
  isMe: string;
  memos: { memoIdx: number; memo: string }[];
}

const MemberTask = styled.div`
  width: 100%;
  min-height: 8rem;
  display: flex;
  justify-content: center;
  border-bottom: 0.5px solid #dcdcdc;
  padding: 1rem;
  .image_div {
    width: 20%;
    height: 100%;
  }
  .task_div {
    width: 80%;
    height: 100%;
    .task_nickname {
      font-size: 0.875rem;
      color: #000000;
    }
    .task_description {
      font-size: 0.75rem;
      color: #a0a0a0;
    }
  }
`;

const MemberProfile = ({ members }: { members: Member[] }) => {
  const router = useRouter();
  const { projectIdx } = router.query;
  return (
    <Link href={`/myproject/${projectIdx}?tabNum=6`}>
      <a>
        {members.map((member, i) => (
          <MemberTask key={`main_member_${i}`}>
            <div className="image_div">
              <ImageContainer
                size={[33, 33]}
                mode="display"
                imageUrl={member.profileUrl}
              />
            </div>
            <div className="task_div">
              <div className="task_nickname">{member.name}</div>
              {member.memos.map((v, idx) => (
                <span className="task_description" key={`member_task_${idx}`}>
                  • {v}
                </span>
              ))}
            </div>
          </MemberTask>
        ))}
      </a>
    </Link>
  );
};

export default MemberProfile;
