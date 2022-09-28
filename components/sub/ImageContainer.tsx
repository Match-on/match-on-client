import Image from "next/image";

interface FileProps {
  fileName: string;
  url: string;
  size?: number[];
}

const ImageContainer: React.FC<FileProps> = (props) => {
  console.log(props.size);

  return (
    <div>
      <Image
        src={props.url}
        alt={props.fileName}
        width={props.size.length > 0 ? props.size[0] : 300}
        height={props.size.length > 0 ? props.size[1] : 300}
      />
    </div>
  );
};

export default ImageContainer;
