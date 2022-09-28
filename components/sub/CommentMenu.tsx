import { useEffect, useRef, useState } from "react";

import styled from "@emotion/styled";
import Menu from "../../public/componentSVG/Menu.svg";
import axios from "axios";
import { API_URL } from "../api/API";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "../../src/hooks/hooks";
import { commentAction } from "../../src/redux/reducers/comment";
import { useRouter } from "next/router";

const MenuOption = styled.div`
  height: 2.5rem;
  width: 11rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 0.625rem;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  padding: 5% 2%;
`;
const OptionList = styled.li<{ position: string }>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 1rem;
  font-size: 0.75rem;
  width: 50%;
  cursor: pointer;
  border-left: ${(props) =>
    props.position === "right" ? "0.1px solid #aaaaaa" : "none"};
  border-right: ${(props) =>
    props.position === "left" ? "0.1px solid #aaaaaa" : "#none"};
  &:hover {
    color: #47d2d2;
    > svg {
      fill: #47d2d2;
    }
  }
`;

const MenuSelect = styled.div<{ isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? "11rem" : "1rem")};
  height: 1rem;
  display: flex;
`;

const tabDeleteUrl = {
  myproject: {
    "1": "teams/notes/comments/",
    "3": "teams/drives/comments/",
    "5": "teams/notices/comments/",
  },
  classboard: "lectures/posts/comments/",
  contest: "activities/posts/comments/",
};

const CommentMenu = (props) => {
  //props로 index랑 함수 네임은 없음.
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = router.pathname.split("/")[1];
  const { tabNum } = router.query;
  const dispatch = useAppDispatch();

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const menuRef = useRef<any>(null);
  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setOpenMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  useEffect(() => {
    console.log(tabDeleteUrl[pathname][String(tabNum)]);
  }, []);

  const deleteLectureComment = async () => {
    const deleteUrl =
      pathname === "myproject"
        ? `${tabDeleteUrl[pathname][String(tabNum)]}`
        : `${tabDeleteUrl[pathname]}`;
    console.log("deleteUrl", deleteUrl);

    try {
      const res = await axios.delete(
        API_URL + `${deleteUrl}${props.commentIdx}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      if (res.data.code === 1000) {
        setOpenMenu(false);
        props.getPost();
      } else {
        alert("삭제에 실패하였습니다.");
      }
    } catch (err) {
      alert(err);
    }
  };

  const onPatchComment = () => {
    dispatch(commentAction({ state: "patch", idx: props.commentIdx }));
    setOpenMenu(false);
  };

  return (
    <MenuSelect isOpen={openMenu} ref={menuRef}>
      {openMenu && (
        <MenuOption>
          <OptionList position="left" onClick={deleteLectureComment}>
            삭제하기
          </OptionList>
          <OptionList position="right" onClick={() => onPatchComment()}>
            수정하기
          </OptionList>
        </MenuOption>
      )}
      <Menu
        style={{ cursor: "pointer", width: "1rem" }}
        onClick={() => setOpenMenu((prev) => !prev)}
      />
    </MenuSelect>
  );
};

export default CommentMenu;
