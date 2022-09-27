import styled from "@emotion/styled";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_URL } from "../../api/API";
import { DriveRow, MeetingRow } from "../components/PostRow";
import DriveModal from "./tabComponents/Modal/Drive/DriveModal";
import FolderModal from "./tabComponents/Modal/Drive/FolderModal";
import FolderIcom from "../../../public/myprojectSVG/Folder.svg";
import FolderAddIcom from "../../../public/myprojectSVG/Folder_Add.svg";

interface CommentProps {
  commentIdx: number;
  comment: string;
  createdAt: string;
  isMe: string;
  isWriter: string;
  name: string;
  profileUrl: string;
  childComments: [];
}
interface FileProps {
  fileName: string;
  url: string;
}
interface DriveProps {
  driveIdx: number;
  title: string;
  body: string;
  createdAt: string;
  team: { teamIdx: number };
  writer: string;
  isMe: string;
  files: FileProps[];
  comments: CommentProps[];
}
interface Folder {
  folderIdx: number;
  name: string;
  count: string;
}
interface Drive {
  driveIdx: number;
  title: string;
  createdAt: string;
  name: string;
  isNew: number;
  commentCount: string;
  files: string[];
}
interface FolderProps {
  folders: Folder[];
  drives: Drive[];
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

const TopSection = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2%;
  .upload_button {
    width: 6rem;
    height: 2.3rem;
    background-color: #47d2d2;
    border-radius: 10px;
    text-align: center;
    line-height: 2.3rem;
    color: #ffffff;
    cursor: pointer;
  }
`;
const FolderTree = styled.div`
  width: 100%;
  height: 2.5rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  color: #aaaaaa;
  .tree_green {
    color: #47d2d2 !important;
  }
  &:hover {
    font-weight: 550;
    cursor: pointer;
  }
`;

const InputFilter = styled.input`
  width: 40%;
  min-width: 9.5rem;
  height: 60%;
  border-radius: 0.625rem;
  padding-left: 1%;
  border: none;
  background: #f2f6f6;
  color: #ababab;
  &:focus {
    outline: 2px solid #47d2d2;
  }
  ::-webkit-input-placeholder {
    margin-left: 20px;
  }
`;

const FolderContainer = styled.div`
  width: 100%;
  height: 7rem;
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

const FolderBox = styled.div`
  width: 15rem;
  height: 6rem;
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-right: 1rem;
  padding-left: 1rem;
  &:hover {
    font-weight: 600;
    cursor: pointer;
  }
  > svg {
    margin-right: 0.5rem;
  }
`;
const AddFolderBox = styled(FolderBox)`
  color: #aaaaaa;
  justify-content: center;
  margin-right: 0;
`;

const Table = styled.div`
  width: 100%;
  height: calc(100% - 14.5rem);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;
interface TreeProps {
  name: string;
  idx: number;
}
// : MemberInformation[]
const Drive = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { projectIdx } = router.query;

  const [folderTree, setFolderTree] = useState<TreeProps[]>([]);

  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [isDriveOpen, setIsDriveOpen] = useState(false);

  const [keyword, setKeyword] = useState<string>("");

  const [drive, setDrive] = useState<DriveProps[]>();
  const [folder, setFolder] = useState<FolderProps>({
    folders: [],
    drives: [],
  });
  const [currentFolder, setCurrentFolder] = useState<number>(0);

  const handleFolderModalOpen = () => {
    setIsFolderOpen((prev) => !prev);
  };
  const handleDriveModalOpen = () => {
    setIsDriveOpen((prev) => !prev);
  };

  const accessFolder = (folderName, folderIdx) => {
    setFolderTree([...folderTree, { name: folderName, idx: folderIdx }]);
    setCurrentFolder(folderIdx);
  };
  const moveFolder = (folderName, folderIdx) => {
    const arrIdx = folderTree.indexOf({ name: folderName, idx: folderIdx });
    setFolderTree(folderTree.slice(0, arrIdx + 2));
    setCurrentFolder(folderIdx);
  };

  const getFolderList = async () => {
    try {
      const response = await axios.get(
        API_URL + `teams/${projectIdx}/drives/folders/${currentFolder}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      setFolder(response.data.result);
    } catch (err) {
      console.log(err.response);
    }
  };

  const SearchDrive = async () => {
    setCurrentFolder(0);
    setFolderTree([]);
    const params = {
      keyword: keyword,
    };
    try {
      const res = await axios.get(API_URL + `teams/${projectIdx}/drives`, {
        params: params,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFolderList();
  }, [session, currentFolder, isFolderOpen, isDriveOpen]);
  return (
    <Container>
      <FolderTree>
        <span
          onClick={() => {
            setCurrentFolder(0);
            setFolderTree([]);
          }}
        >
          드라이브
        </span>
        {folderTree.map((tree, idx) => (
          <div key={`tree_${idx}`}>
            <span>&nbsp;&gt;</span>
            <span
              className={idx === folderTree.length - 1 ? "tree_green" : ""}
              onClick={() => moveFolder(tree.name, tree.idx)}
            >
              {" "}
              {tree.name}
            </span>
          </div>
        ))}
      </FolderTree>
      <TopSection>
        <InputFilter
          type="text"
          placeholder="검색"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              SearchDrive();
            }
          }}
        />
        <div className="upload_button" onClick={() => setIsDriveOpen(true)}>
          업로드
        </div>
      </TopSection>
      <FolderContainer>
        {folder.folders.map((f, idx) => (
          <FolderBox
            key={`folder_box${idx}`}
            onClick={() => accessFolder(f.name, f.folderIdx)}
          >
            <FolderIcom />
            {f.name}
            {f.count}
          </FolderBox>
        ))}
        <AddFolderBox onClick={handleFolderModalOpen}>
          <FolderAddIcom />새 폴더
        </AddFolderBox>
      </FolderContainer>
      <Table>
        {folder.drives.map((d, idx) => (
          <Link
            href={`/myproject/${projectIdx}/${d.driveIdx}?tabNum=3`}
            key={idx}
          >
            <a>
              <DriveRow {...d} key={`drive_row${idx}`} />
            </a>
          </Link>
        ))}
      </Table>
      {isDriveOpen && (
        <DriveModal
          isOpen={isDriveOpen}
          handleOpen={handleDriveModalOpen}
          projectIdx={projectIdx}
          folderIdx={currentFolder}
        />
      )}
      {isFolderOpen && (
        <FolderModal
          isOpen={isFolderOpen}
          handleOpen={handleFolderModalOpen}
          projectIdx={projectIdx}
          folderIdx={currentFolder}
        />
      )}
    </Container>
  );
};

export default Drive;

//https://intrepidgeeks.com/tutorial/upload-files-to-react
