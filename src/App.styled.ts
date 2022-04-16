import styled, { css } from "styled-components";

const cell = "60px";
const cellBorder = "1px solid #fff";

export const Container = styled.div`
  position: relative;
  background-color: #eee;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 10px 10px 10px #ddd;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, ${cell});
  grid-template-rows: repeat(9, ${cell});
  border-top: ${cellBorder};
  border-left: ${cellBorder};
  background-color: #ddd;
`;

const renderSoldierRoad = () => css`
  content: "";
  position: absolute;
  top: 0;
  width: 200%;
  height: 200%;
  border: ${cellBorder};
`;

const renderMark = (mark?: Mark) => {
  if (!mark) return null;

  const distance = "4px";
  const size = "10px";

  const common = css`
    content: "";
    position: absolute;
    width: ${size};
    height: ${size};
    border: ${cellBorder};
  `;

  switch (mark) {
    case "lb":
      return css`
        ${common}
        left: ${distance};
        bottom: ${distance};
        border-right: none;
        border-top: none;
      `;
    case "lt":
      return css`
        ${common}
        left: ${distance};
        top: ${distance};
        border-right: none;
        border-bottom: none;
      `;
    case "rb":
      return css`
        ${common}
        right: ${distance};
        bottom: ${distance};
        border-left: none;
        border-top: none;
      `;
    case "rt":
      return css`
        ${common}
        right: ${distance};
        top: ${distance};
        border-left: none;
        border-bottom: none;
      `;
  }
};

export const Item = styled.div<{
  center: boolean;
  soldier?: string;
  mark?: Mark;
  markOther?: Mark;
}>`
  text-align: center;
  line-height: ${cell};
  border-right: ${cellBorder};
  border-bottom: ${cellBorder};
  overflow: hidden;
  position: relative;

  ${({ center }) =>
    center &&
    css`
      border-right: none;
    `}

  ${({ soldier }) => {
    switch (soldier) {
      case "lt":
        return css`
          &::after {
            left: 0;
            transform-origin: left top;
            ${renderSoldierRoad()}
            transform: rotate(45deg) translate(0, -0.5px);
          }
        `;
      case "rt":
        return css`
          &::after {
            right: 0;
            transform-origin: right top;
            ${renderSoldierRoad()}
            transform: rotate(45deg) translate(0.5px, 0);
          }
        `;
    }
  }}

  &::before {
    ${({ mark }) => renderMark(mark)}
  }

  &::after {
    ${({ markOther }) => renderMark(markOther)}
  }
`;

export const Text = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  width: 100%;
  font-size: 30px;
  display: flex;
  justify-content: space-around;
  color: #7d7d7d;
`;
