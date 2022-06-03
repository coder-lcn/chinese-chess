import { useCallback, useEffect, useRef } from "react";
import { ChessType } from "./types";

export const batchRender = (num: number) =>
  Array(num)
    .fill("")
    .map((_, i) => i);

export const debounce = (callback: () => void) => {
  const timer = useRef<number>(0);

  return useCallback(() => {
    if (timer.current) return;
    timer.current = setTimeout(() => {
      callback();
      timer.current = 0;
    }, 100);
  }, []);
};

const DESC = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
export const ChessLog = (props: { start: number; end: number; chessType: ChessType; player: Player }) => {
  const { start, end } = props;
  const isRed = props.player === "红";
  const y = Math.abs(start - end) / 9 - 1;

  let log = "";

  if (isRed) {
    const x = 8 - (start % 9);
    let action = start > end ? "进" : "退";
    log = `%c [红] ${props.chessType}${DESC[x]}${action}${DESC[y]}`;
  } else {
    const x = 8 - (start % 9);
    let action = start < end ? "进" : "退";
    log = `%c [黑] ${props.chessType}${DESC[8 - x]}${action}${DESC[y]}`;
  }

  console.log(log, `color: ${isRed ? "red" : "#fff"}`);
};

/**
 * 前进或后退一行
 *
 * @param startPoint 起点
 * @returns 目标行的位置
 */
export const toOneRow = (startPoint: number, toFront: boolean) => {
  return toFront ? startPoint - 9 : startPoint + 9;
};

// 去第几列
export const toCol = () => { };
