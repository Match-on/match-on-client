import { useRouter } from "next/router";

const PostDetail = () => {
  const router = useRouter();
  const { postIdx } = router.query;
  return (
    <div>
      <div>{postIdx}</div>
    </div>
  );
};

export default PostDetail;
