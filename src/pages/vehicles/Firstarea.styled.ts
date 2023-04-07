import styled from "styled-components";
export const Container = styled.div`
  background-color: black;
  position: absolute;
  width: 100vw;
  height: calc(100vh - 160px);
  transition: margin-top 1s, height 1s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(https://www.hyundai.com/static/images/bg/bg_visual_marble.png);
  background-size: cover;
`;
export const Wrapper = styled.div`
  width: calc(100vw - 120px);
  height: calc(100vh - 320px);
  background-image: url(https://www.hyundai.com/contents/repn-car/key-visual/homepage/pc/nexo-21my-w.jpg);
  background-position: center;
  position: relative;
`;
export const Title = styled.h2`
  position: absolute;
  font-family: "HyundaiSansTextKR";
  font-size: 66px;
  font-weight: 600;
  left: 200px;
`;
export const Headline = styled.h3`
  position: absolute;
  font-family: "HyundaiSansTextKR";
  font-size: 20px;
  font-weight: 100;
  left: 203px;
  top: 130px;
`;
export const Price = styled.h3`
  position: absolute;
  font-family: "HyundaiSansTextKR";
  font-size: 27px;
  font-weight: 600;
  left: 205px;
  top: 170px;
`;
export const RouteWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 200px;
  top: -65px;
`;
export const RouteP = styled.p`
  font-family: "HyundaiSansTextKR";
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
`;
export const Arrow = styled.div`
  width: 6px;
  height: 6px;
  border-top: 1px solid #002c5f;
  border-right: 1px solid #002c5f;
  transform: rotate(45deg);
`;
export const Heart = styled.div`
  position: absolute;
  width: 18px;
  height: 15px;
  z-index: 1000;
  color: red;
  /* background: url(https://www.hyundai.com/static/images/ico_btn.png);
  background-position: -66px -134px; */
  cursor: pointer;
`;
