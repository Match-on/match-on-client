import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Editor, EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "@emotion/styled";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

const EditorContainer = styled.div<{ clickable: string }>`
  height: 500px;
  pointer-events: ${(props) => props.clickable};
  margin-bottom: 1rem;
  .wrapper-class {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  .editor {
    height: 90%;
    border: 1px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 0.5rem !important;
    overflow-y: scroll;
    font-size: 0.9rem;
    -ms-overflow-style: none; /* IE, Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }
  /* .toolbar-class {
    display: none;
  } */
`;
//ReferenceError: window is not defined 해결법?
const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const MeetEditor = ({
  setBody,
  data,
  clickable,
  placeholder = "내용을 작성해주세요.",
}) => {
  const blocksFromHTML = htmlToDraft(data);
  const { contentBlocks, entityMap } = blocksFromHTML;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const initialState = data
    ? EditorState.createWithContent(contentState)
    : EditorState.createEmpty();
  const [editorState, setEditorState] = useState<EditorState>(initialState);
  //에디터 바깥 div 높이 설정해서 높이 설정하기
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  useEffect(() => {
    setEditorState(initialState);
  }, [data]);
  //이미지를 html태그로 변환시킴
  const editorToHtml = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );

  useEffect(() => {
    setBody(editorToHtml);
  }, [editorToHtml]);

  return (
    <EditorContainer clickable={clickable ? "" : "none"}>
      <Editor
        // 에디터와 툴바 모두에 적용되는 클래스
        wrapperClassName="wrapper-class"
        // 에디터 주변에 적용된 클래스
        editorClassName="editor"
        // 툴바 주위에 적용된 클래스
        toolbarClassName="toolbar-class"
        // 툴바 설정
        toolbar={{
          // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }}
        placeholder={placeholder}
        // 한국어 설정
        localization={{
          locale: "ko",
        }}
        // 초기값 설정
        editorState={editorState}
        // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
        onEditorStateChange={onEditorStateChange}
      />
    </EditorContainer>
  );
};

export default MeetEditor;

//https://haranglog.tistory.com/12
