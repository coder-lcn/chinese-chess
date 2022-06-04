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
  const { start, end, chessType } = props;
  const colMoved = Math.abs(start - end);
  const isRed = props.player === "红";
  const x = 8 - (start % 9);
  const y = colMoved / 9 - 1;
  const movedRow = colMoved === 9;
  const soldierMoved = colMoved === 8 || colMoved === 10;

  let action = '';
  let log = "";

  if (isRed) {
    if (movedRow) {
      action = start > end ? "进" : "退";
      log = `%c [红] ${props.chessType}${DESC[x]}${action}${DESC[y]}`;
    } else {
      action = '平';
      if (soldierMoved) {
        action = start > end ? '进' : '退'
      }
      const i = 8 - end % 9;
      log = `%c [红] ${props.chessType}${DESC[x]}${action}${DESC[i]}`;
    }
  } else {
    if (movedRow) {
      action = start < end ? "进" : "退";
      log = `%c [黑] ${props.chessType}${DESC[8 - x]}${action}${DESC[y]}`;
    } else {
      action = '平';
      if (soldierMoved) {
        action = start > end ? '退' : '进';
      }
      const i = end % 9;
      log = `%c [红] ${props.chessType}${DESC[8 - x]}${action}${DESC[i]}`;
    }
  }

  console.log(log, `color: ${isRed ? "red" : "#000"}`);
};

/**
 * 兵卒 前进或后退一行
 *
 * @param startPoint 起点
 * @param toFront 是否向前
 * @returns 目标行的位置
 */
export const toOneRow = (startPoint: number, toFront: boolean) => {
  return toFront ? startPoint - 9 : startPoint + 9;
};

/**
 * 兵/卒 向左或右移动一列
 *
 * @param startPoint 起点
 * @param type 兵 ｜ 卒
 * @returns 目标行的位置
 */
export const toOneCol = (startPoint: number, type: '兵' | '卒') => {
  const criticalPoint = startPoint < 45;
  const redCrossedRiver = criticalPoint;
  const blackCrossedRiver = !criticalPoint;

  const filterCritical = (target: number[]) => {
    return target.filter((item, i) => {
      if (item === 0) return true;

      if (i === 0) {
        return (item + 1) % 9 !== 0;
      } else if (i === 1) {
        return item % 9 !== 0;
      }

      return true;
    })
  }

  if (type === '兵' && redCrossedRiver) {
    return filterCritical([startPoint - 1, startPoint + 1]);
  } else if (type === '卒' && blackCrossedRiver) {
    return filterCritical([startPoint - 1, startPoint + 1]);
  } else {
    return []
  }
};

// 去第几列
export const toCol = () => { };

// 去第几行
export const toRow = () => { }
