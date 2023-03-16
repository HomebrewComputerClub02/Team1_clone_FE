import styled from "styled-components";
export const Container = styled.main`
  top: 100vh;
  position: absolute;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  height: calc(100vh - 80px);
  transition: top 1s;
`;
export const DummyDiv = styled.div`
  background-color: ${(props) => props.color};
  height: calc(100vh - 80px);
  width: 100vw;
  scroll-snap-align: center;
`;