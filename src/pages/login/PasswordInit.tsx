import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";

import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CHANGEPASSWORD, EMAIL, sendEmail } from "./../../apis/gql";

const Wrapper = styled.div`
  margin: 0;
  font-weight: 400;
  font-family: "Noto Sans KR", sans-serif;
  letter-spacing: -0.4px;
  padding: 0;
  width: 100%;
`;

const Bar = styled.div`
  width: 100%;
  height: 6px;
  background-color: #012d5e;
`;

const LogoDiv = styled.div`
  width: 100%;
  height: 72px;
  text-align: center;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const LogoDivInner = styled.div`
  text-align: left;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  align-items: center;
  width: 680px;
  height: 100%;
  padding: 0 13px;
`;

const TitleDiv = styled.div`
  width: 100%;
  height: 83px;
  text-align: center;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const TitleDivInner = styled.div`
  text-align: center;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 680px;
  height: 100%;
  padding: 0 13px;
  flex-direction: column;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.8);
`;

const Section = styled.div`
  box-sizing: border-box;
  width: 680px;
  height: fit-content;
  margin: 0 auto;
  display: flex;
  padding: 24px;
  font-weight: 400;
  font-size: 13px;
  color: #666;
  flex-direction: column;
  position: relative;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

const DivTitle = styled.div`
  margin-bottom: 8px;
  width: 590px;
  height: 24px;
  font-size: 16px;
  display: flex;
  align-items: center;
  font-weight: 300;
`;

const DivContent = styled.div`
  border-left: 1px solid #bdbdbd;
  padding-left: 20px;
  padding-right: 8px;
  margin-left: 12px;
  width: 550px;
  height: fit-content;
  margin-bottom: 8px;
  padding-top: 5px;
`;

const CircleN = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #3387bd;
  color: white;
  display: inline-block;
  margin-right: 7px;
  text-align: center;
  font-size: 12px;
  font-weight: 300;
  line-height: 24px;
`;

const Footer = styled.div`
  width: 100%;
  height: 50%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  color: rgba(0, 0, 0, 0.7);
  font-size: 12px;
  letter-spacing: 0.1px;
  font-weight: 300;
  padding-top: 5px;
`;

const BtnDiv = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Btn = styled.div`
  box-sizing: border-box;
  width: 271px;
  height: 50px;
  border: 1px solid #6f6f6f;
  background-color: hsla(0, 0%, 85.9%, 0.1);
  color: #6f6f6f;
  font-weight: 300;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease;
  position: relative;
  line-height: 100%;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: hsla(0, 0%, 85.9%, 0.35);
  }
  &:focus {
    background-color: hsla(0, 0%, 85.9%, 0.35);
  }
`;

// 수정사항 1
// &.checked 전후로 pointer-events 추가
// 클릭이 아예 안되게
const BlueBtn = styled.div`
  box-sizing: border-box;
  width: 271px;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: white;
  background-color: #3387bd;
  font-weight: 300;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease;
  position: relative;
  line-height: 100%;
  margin-bottom: 10px;
  pointer-events: none;
  opacity: 0.5;
  &.checked {
    pointer-events: auto;
    cursor: pointer;
    opacity: 1;
    &:hover {
      background-color: rgb(0, 40, 132);
    }
    &:focus {
      background-color: rgb(0, 40, 132);
    }
  }
`;

const MenuSection = styled.div`
  box-sizing: border-box;
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: center;
  width: 400px;
  height: 35px;
  letter-spacing: 0.5px;
  margin-top: 18px;
  color: #006ca4;
  font-size: 13px;
  justify-content: center;
`;

const MenuDiv = styled.div`
  width: 120px;
  font-size: 13px;
  height: 15px;
  padding: 0;
  font-weight: 400;
  line-height: 10px;
  cursor: pointer;
  text-decoration-line: none;
  border-bottom: 0.5px solid #006ca4;
  color: #006ca4;

  &:link,
  &:visited,
  &:hover,
  &:active {
    color: #006ca4;
    font-size: 13px;
    text-decoration-line: none;
  }
`;

const MenuA = styled.a`
  width: 120px;
  font-size: 13px;
  height: 15px;
  padding: 0;
  font-weight: 500;
  line-height: 10px;
  cursor: pointer;
  text-decoration-line: none;
  color: #006ca4;

  &:link,
  &:visited,
  &:hover,
  &:active {
    color: #006ca4;
    font-size: 13px;
    text-decoration-line: none;
  }
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  margin: 6px 6px 0 0;
  content: no-open-quote;
  display: inline-block;
  background: #999;
  border-radius: 3px;
  vertical-align: top;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  border: 1px solid #ced4da;
  color: rgba(0, 0, 0, 0.6);
  padding: 10px 12px;
  font-size: 13px;
  margin-bottom: 7px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 7px;
  transition: 0.2s ease;
  &::placeholder {
    color: rgba(0, 0, 0, 0.25);
    font-weight: 600;
    letter-spacing: -0.7px;
  }
  &:focus {
    outline: 1px solid #00a7cf;
  }
`;

// 수정사항 2
// buttonClicked state 추가

// 수정사항 3
// useQuery 안에 skip option 사용.
// buttonClicked 가 false 일때는 실행안되게.
// setEmail() 일어나는 onChange에는 setButtonClicked(false)
// 인증버튼 눌렀을때만 setButtonClicked(true)

// 수정사항4
// 비밀번호 수정 api 작성완료
function PasswordInit() {
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [email, setEmail] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  const btn = useRef<any>([]);
  const cir = useRef<any>([]);

  // 인증 확인
  // const [check_validation, {}] = useLazyQuery(EMAIL);
  const { refetch } = useQuery(EMAIL, {
    variables: { email },
    skip: !buttonClicked,
  });

  // 이메일 보내기
  const [sendE, {}] = useMutation(sendEmail, { onError: () => {} });
  const sendFunction = async (email: any) => {
    const send_result = await sendE({
      variables: {
        email,
      },
    });
    if (send_result.data) {
      console.log(send_result.data);
    } else {
      const errors = send_result.errors;
      console.log(errors);
    }
  };

  const [changePw, {}] = useMutation(CHANGEPASSWORD, { onError: () => {} });
  const changeFunction = async (email: string, password: string) => {
    const change_result = await changePw({
      variables: {
        email,
        password,
      },
    });
    if (change_result.data) {
      console.log(change_result.data);
    } else {
      const errors = change_result.errors;
      console.log(errors);
    }
  };

  return (
    <Wrapper>
      <Bar></Bar>
      <LogoDiv>
        <LogoDivInner>
          <img
            src={logo}
            alt=""
            style={{ width: "145px", paddingTop: "4px" }}
          ></img>
        </LogoDivInner>
      </LogoDiv>
      <TitleDiv>
        <TitleDivInner>
          <div
            style={{
              fontSize: "19px",
              fontWeight: "500",
              marginBottom: "9px",
            }}
          >
            비밀번호 초기화
          </div>
        </TitleDivInner>
      </TitleDiv>
      <Section>
        <DivTitle>
          <CircleN
            ref={(e) => {
              cir.current[0] = e;
            }}
          >
            1
          </CircleN>
          비밀번호 초기화
        </DivTitle>
        <DivContent>
          <Dot></Dot>비밀번호를 초기화하시려면 아래 인증 수단을 선택하세요.
          <BtnDiv>
            <Btn>본인 인증</Btn>
            <Btn>이메일 인증</Btn>
            <Btn>모바일 인증</Btn>
          </BtnDiv>
        </DivContent>
        <DivTitle>
          <CircleN
            ref={(e) => {
              cir.current[1] = e;
            }}
            style={{ backgroundColor: "transparent", color: "#666" }}
          >
            2
          </CircleN>
          인증 요청
        </DivTitle>
        <DivContent style={{ height: "150px" }}>
          <Dot></Dot>이메일
          <Input
            type="email"
            placeholder="이메일 주소"
            onChange={(e) => {
              setEmail(e.target.value);
              if (buttonClicked) setButtonClicked(false);
              btn.current[0].classList.add("checked");
            }}
          ></Input>
          <BtnDiv>
            <Btn>이전</Btn>
            <BlueBtn
              ref={(e) => {
                btn.current[0] = e;
              }}
              onClick={async (e) => {
                console.log("이메일 전송");
                console.log(`to ${email}`);
                const res = await sendFunction(email);
                btn.current[1].classList.add("checked");
              }}
            >
              발송하기
            </BlueBtn>
          </BtnDiv>
        </DivContent>
        <DivTitle>
          <CircleN
            ref={(e) => {
              cir.current[2] = e;
            }}
          >
            3
          </CircleN>
          인증 확인
        </DivTitle>
        <DivContent style={{ height: "150px" }}>
          <Dot></Dot>입력한 이메일로 이동하여 이메일 인증을 완료해 주세요.
          <br />
          <Dot></Dot>이메일 인증 완료 후 아래 '인증' 버튼을 눌러 주세요.
          <br />
          <Dot></Dot>이메일 인증 방법 안내 (자세히 보기)
          <BtnDiv>
            <Btn style={{ marginTop: "10px" }}>이전</Btn>
            <BlueBtn
              ref={(e) => {
                btn.current[1] = e;
              }}
              style={{ marginTop: "10px" }}
              onClick={async () => {
                setButtonClicked(true);
                const { data } = await refetch();
                if (data) {
                  if (data.completeEmailCheck === "true") {
                    console.log("인증완!!");
                    alert("인증되었습니다.");
                  } else {
                    alert("아직 인증 전입니다. 인증 메일을 확인해주세요.");
                  }
                }
              }}
            >
              인증
            </BlueBtn>
          </BtnDiv>
        </DivContent>
        <DivTitle>
          <CircleN
            ref={(e) => {
              cir.current[3] = e;
            }}
            style={{ backgroundColor: "transparent", color: "#666" }}
          >
            4
          </CircleN>
          정보 확인 또는 변경
        </DivTitle>
        <DivContent style={{ height: "190px" }}>
          <Dot></Dot>비밀번호를 입력하고 변경 버튼을 누르세요.
          <Input
            type="password"
            placeholder="8~20자의 영문 대/소문자, 숫자, 특수문자 중 3가지 이상을 혼용하여 입력해 주세요."
            onChange={(e) => {
              setPw1(e.target.value);
            }}
            style={{ letterSpacing: "7px", paddingLeft: "15px" }}
          ></Input>
          <Input
            type="password"
            placeholder="비밀번호 확인"
            onChange={(e) => {
              setPw2(e.target.value);
              btn.current[2].classList.add("checked");
            }}
            style={{ letterSpacing: "7px", paddingLeft: "15px" }}
          ></Input>
          <BtnDiv>
            <BlueBtn
              ref={(e) => {
                btn.current[2] = e;
              }}
              style={{ width: "100%" }}
              onClick={async () => {
                if (pw1 !== pw2) {
                  alert("비밀번호가 일치하지 않습니다.");
                } else {
                  const res = await changeFunction(email, pw1);
                  console.log("res : ", res);
                  alert("변경 완료. 로그인해주셈");
                  window.location.href = "/";
                }
              }}
            >
              변경하기
            </BlueBtn>
          </BtnDiv>
        </DivContent>
      </Section>
      <Footer>
        <MenuSection>
          <MenuDiv>
            <MenuA href="/login">로그인 페이지로 이동</MenuA>
          </MenuDiv>
        </MenuSection>
        COPYRIGHT © HYUNDAI MOTOR COMPANY. ALL RIGHTS RESERVED.
      </Footer>
    </Wrapper>
  );
}

export default PasswordInit;
