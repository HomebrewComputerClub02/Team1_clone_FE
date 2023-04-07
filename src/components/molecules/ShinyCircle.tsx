import styled, { keyframes } from "styled-components";
import { useEffect, useState, useRef } from "react";
import xbutton from "../../assets/xbutton.svg";
const Shine = keyframes`
    0%{
        transform:scale(0);
        opacity:100%;

    }
    5%{
        transform:scale(6);
        opacity:100%;
    }
    100%{
        transform:scale(8);
        opacity:0%;
    }
`;
export const Container = styled.div`
  position: absolute;
  cursor: pointer;
  display: flex;
`;
export const Wrapper = styled.div`
  position: relative;
  background-color: #007fa8;
  animation: ${Shine} 1s infinite linear;
  display: flex;
  height: 6px;
  width: 6px;
  border-radius: 3px;
`;
export const ModalWrapper = styled.div`
  background-color: white;
  width: 70vw;
  height: calc(50vh - 60px);
  display: flex;
  position: fixed;
  top: 30%;
  left: 20%;
  cursor: default;
  z-index: 5;
`;
export const ModalImage = styled.div`
  width: 38vw;
  height: 100%;
  background-position: center;
  background-size: cover;
`;
export const ModalTextWrapper = styled.div`
  width: 32vw;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  position: relative;
`;
export const XButton = styled.div`
  background-color: transparent;
  background-image: url(${xbutton});
  background-position: center;
  background-size: cover;
  height: 30px;
  width: 30px;
  position: absolute;
  right: 20px;
  bottom: 40px;
  cursor: pointer;
`;
export const ModalTitle = styled.div`
  font-family: "HyundaiSansTextKR";
  font-size: 21px;
  font-weight: 600;
`;
export const ModalDetails = styled.div`
  font-family: "HyundaiSansTextKR";
  font-size: 16px;
  color: #666666;
`;
export const Balloon = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
export const Textbox = styled.div`
  position: absolute;
  width: max-content;
  font-family: "HyundaiSansTextKR";
  color: black;
  background-color: white;
  padding: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  z-index: 3;
`;
export const UpwardTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 12px solid white;
  border-top: 12px solid transparent;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
`;
export const DownwardTriangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: 12px solid transparent;
  border-top: 12px solid white;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
`;

interface IContent {
  left: string;
  top: string;
  title: string;
  details: string;
  imgurl: string;
}

function ShinyCircle({ left, top, title, details, imgurl }: IContent) {
  const [isClicked, setIsClicked] = useState(false);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const modal = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: any) => {
    if (isClicked && modal.current && !modal.current.contains(event.target)) {
      setIsClicked(false);
      setIsMouseEntered(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
  });
  return (
    <Container
      style={{ left: left, top: top }}
      onClick={(event) => {
        setIsClicked(true);
        event?.stopPropagation();
      }}
      onMouseEnter={() => {
        setIsMouseEntered(true);
      }}
      onMouseLeave={() => {
        setIsMouseEntered(false);
      }}
    >
      <Wrapper />
      {isMouseEntered ? (
        <Balloon>
          {parseInt(top) > 600 ? (
            <DownwardTriangle style={{ bottom: "12px", right: "-2px" }} />
          ) : (
            <UpwardTriangle style={{ top: "12px", right: "-4px" }} />
          )}
          <Textbox
            style={
              parseInt(top) > 600
                ? { bottom: "36px", left: "-30px" }
                : { top: "36px", left: "-30px" }
            }
          >
            {title}
          </Textbox>
        </Balloon>
      ) : null}
      {isClicked ? (
        <ModalWrapper ref={modal}>
          <ModalImage
            style={{ backgroundImage: `url(${imgurl})` }}
          ></ModalImage>
          <ModalTextWrapper>
            <ModalTitle>{title}</ModalTitle>
            <ModalTextWrapper>{details}</ModalTextWrapper>
            <XButton
              onClick={(event) => {
                setIsClicked(false);
                setIsMouseEntered(false);
                event.stopPropagation();
              }}
            />
          </ModalTextWrapper>
        </ModalWrapper>
      ) : null}
    </Container>
  );
}
export default ShinyCircle;
