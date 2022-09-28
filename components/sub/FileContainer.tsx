import styled from "@emotion/styled";

interface FileProps {
  fileName: string;
  url: string;
}

const FileWrapper = styled.div`
  font-size: 1rem;
  display: flex;
  margin-bottom: 0.6rem;
  .grey_text {
    color: #9f9f9f;
  }
  .file_name {
    color: #47d2d2;
    text-decoration: underline;
    margin-left: 0.5rem;
  }
`;

const FileContainer: React.FC<FileProps> = (props) => {
  return (
    <FileWrapper>
      <span className="grey_text">첨부 파일 | </span>
      <a
        href={props.url}
        className="file_name"
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.fileName}
      </a>
    </FileWrapper>
  );
};

export default FileContainer;
