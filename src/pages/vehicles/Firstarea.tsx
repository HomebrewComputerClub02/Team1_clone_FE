import { CSSProperties } from "styled-components";
import NavyButton from "../../components/atoms/NavyButton";
import * as S from "./Firstarea.styled";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { USER, LIKEADD, GETLIKES } from "../../apis/gql";
import React, { useRef, useState, useEffect } from "react";
import ChLike from "./ChLike";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { likedOrNot, likeBtn } from "./../../lib/util/atoms";

interface IStyle {
  style: CSSProperties;
}
function Firstarea({ style }: IStyle) {
  const heart = useRef<any>(null);
  /* const [isLiked, setLike] = useState(false); */
  const isLiked = useRecoilValue(likedOrNot);
  const setLike = useSetRecoilState(likedOrNot);
  const btnOn = useSetRecoilState(likeBtn);
  const [loginCheck, { loading, error, data }] = useLazyQuery(USER);
  const [like, {}] = useMutation(LIKEADD, { onError: () => {} });
  const likeAdd = async (modelId: any) => {
    const res = await like({
      variables: {
        modelId,
      },
    });
    if (res.data) {
      console.log(res.data);
    } else {
      console.log(res.errors);
    }
  };

  useEffect(() => {
    if (isLiked) {
      heart.current.style.color = "red";
    } else {
      heart.current.style.color = "white";
    }
  }, [isLiked]);

  return (
    <S.Container style={style}>
      <S.Wrapper>
        <S.RouteWrapper>
          <S.RouteP>홈</S.RouteP>
          <S.Arrow />
          <S.RouteP>모델</S.RouteP>
          <S.Arrow />
          <S.RouteP>수소/전기차</S.RouteP>
          <S.Arrow />
          <S.RouteP style={{ cursor: "default", color: "#007fA8" }}>
            넥쏘
          </S.RouteP>
        </S.RouteWrapper>
        <S.Title>NEXO</S.Title>
        <S.Headline>Positive Energy, NEXO</S.Headline>
        <S.Price>67,650,000원 부터</S.Price>
        <NavyButton
          message="카탈로그 다운로드"
          top="100px"
          left="calc(100% - 470px)"
        />
        <NavyButton message="가격표 다운로드" top="100px" right="120px" />
        <S.Heart style={{ top: "108px", right: "80px" }}>
          <span
            ref={heart}
            className="material-symbols-outlined"
            style={{
              fontVariationSettings: "'FILL' 1",
              color: "white",
            }}
            onClick={async () => {
              loginCheck();
              console.log(data);
              if (data) {
                btnOn((prev) => !prev);
                /* setLike((prev) => !prev); */
                const likes = await likeAdd("1");
                console.log("♡");
              } else {
                alert("로그인 후 이용해주세요~");
              }
            }}
          >
            favorite
          </span>
          <ChLike />
        </S.Heart>
      </S.Wrapper>
    </S.Container>
  );
}
export default Firstarea;
