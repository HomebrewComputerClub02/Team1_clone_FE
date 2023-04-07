import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { GETLIKES } from "../../apis/gql";
import { likedOrNot, likeBtn } from "../../lib/util/atoms";
import { useEffect } from "react";

function ChLike() {
  const [likeCheck, { loading, error, data }] = useLazyQuery(GETLIKES);
  const setLike = useSetRecoilState(likedOrNot);
  const btnOn = useRecoilValue(likeBtn);

  useEffect(() => {
    likeCheck();
    console.log(data);
    /* setLike(data.isLiked); */
  }, [btnOn]);

  return (
    <>{/* <button onClick={() => setLike((prev) => !prev)}>핱트</button> */}</>
  );
}

export default ChLike;
