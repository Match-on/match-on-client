import { useEffect, useRef, useState } from "react";

import styled from "@emotion/styled";
import Menu from "../../public/componentSVG/Menu.svg";
import axios from "axios";
import { API_URL } from "../api/API";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "../../src/hooks/hooks";
import { commentAction } from "../../src/redux/reducers/comment";
import { useRouter } from "next/router";
import UploadModal from "../ClassBoard/components/Modal/UploadModal";
import PatchPostModal from "./PatchPostModal";

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
  z-index: 1;
`;
const OptionList = styled.li<{ position: string }>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 1rem;
  font-size: 0.75rem;
  width: 50%;
  cursor: pointer;
  border-left: ${(props) => (props.position === "right" ? "0.1px solid #aaaaaa" : "none")};
  border-right: ${(props) => (props.position === "left" ? "0.1px solid #aaaaaa" : "#none")};
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

const PostMenu = (props) => {
  //props로 index랑 함수 네임은 없음.
  const { data: session, status } = useSession();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const router = useRouter();
  const { postIdx, lectureIdx } = router.query;

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

  const deleteComment = async () => {
    try {
      const res = await axios.delete(API_URL + `lectures/posts/${props.postIdx}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      if (res.data.code === 1000) {
        setOpenMenu(false);
        router.push(`/classboard/${props.lectureIdx}?tabnum=${props.tabnum}`);
      } else {
        alert("삭제에 실패하였습니다.");
      }
    } catch (err) {
      alert(err);
    }
  };

  const onPatchPost = () => {
    setModalOpen(true);
  };

  return (
    <MenuSelect isOpen={openMenu} ref={menuRef}>
      {openMenu && (
        <MenuOption>
          <OptionList position="left" onClick={deleteComment}>
            삭제하기
          </OptionList>
          <OptionList position="right" onClick={() => onPatchPost()}>
            수정하기
          </OptionList>
        </MenuOption>
      )}
      <Menu style={{ cursor: "pointer", width: "1rem" }} onClick={() => setOpenMenu((prev) => !prev)} />
      {modalOpen && <PatchPostModal isOpen={modalOpen} handleOpen={() => setModalOpen(false)} />}
    </MenuSelect>
  );
};

export default PostMenu;
