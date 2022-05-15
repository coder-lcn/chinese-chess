import { useRef, useState } from "react";
import { ChessItem } from "./types";

// 后手
const after: Record<number, ChessItem | null> = {
  0: {
    type: "車",
    currPostion: 0,
    player: "黑",
  },
  1: {
    type: "馬",
    currPostion: 1,
    player: "黑",
  },
  2: {
    type: "象",
    currPostion: 2,
    player: "黑",
  },
  3: {
    type: "士",
    currPostion: 3,
    player: "黑",
  },
  4: {
    type: "将",
    currPostion: 4,
    player: "黑",
  },
  5: {
    type: "士",
    currPostion: 5,
    player: "黑",
  },
  6: {
    type: "象",
    currPostion: 6,
    player: "黑",
  },
  7: {
    type: "馬",
    currPostion: 7,
    player: "黑",
  },
  8: {
    type: "車",
    currPostion: 8,
    player: "黑",
  },
  9: null,
  10: null,
  11: null,
  12: null,
  13: null,
  14: null,
  15: null,
  16: null,
  17: null,
  18: null,
  19: {
    type: "炮",
    currPostion: 19,
    player: "黑",
  },
  20: null,
  21: null,
  22: null,
  23: null,
  24: null,
  25: {
    type: "炮",
    currPostion: 25,
    player: "黑",
  },
  26: null,
  27: {
    type: "卒",
    currPostion: 27,
    player: "黑",
  },
  28: null,
  29: {
    type: "卒",
    currPostion: 29,
    player: "黑",
  },
  30: null,
  31: {
    type: "卒",
    currPostion: 31,
    player: "黑",
  },
  32: null,
  33: {
    type: "卒",
    currPostion: 33,
    player: "黑",
  },
  34: null,
  35: {
    type: "卒",
    currPostion: 35,
    player: "黑",
  },
};

// 先手
const before: Record<number, ChessItem | null> = {
  54: {
    type: "兵",
    currPostion: 54,
    player: "红",
  },
  55: null,
  56: {
    type: "兵",
    currPostion: 56,
    player: "红",
  },
  57: null,
  58: {
    type: "兵",
    currPostion: 58,
    player: "红",
  },
  59: null,
  60: {
    type: "兵",
    currPostion: 60,
    player: "红",
  },
  61: null,
  62: {
    type: "兵",
    currPostion: 62,
    player: "红",
  },
  63: null,
  64: {
    type: "炮",
    currPostion: 64,
    player: "红",
  },
  65: null,
  66: null,
  67: null,
  68: null,
  69: null,
  70: {
    type: "炮",
    currPostion: 70,
    player: "红",
  },
  71: null,
  72: null,
  73: null,
  74: null,
  75: null,
  76: null,
  77: null,
  78: null,
  79: null,
  80: null,
  81: {
    type: "車",
    currPostion: 81,
    player: "红",
  },
  82: {
    type: "馬",
    currPostion: 82,
    player: "红",
  },
  83: {
    type: "相",
    currPostion: 83,
    player: "红",
  },
  84: {
    type: "士",
    currPostion: 84,
    player: "红",
  },
  85: {
    type: "帥",
    currPostion: 85,
    player: "红",
  },
  86: {
    type: "士",
    currPostion: 86,
    player: "红",
  },
  87: {
    type: "相",
    currPostion: 87,
    player: "红",
  },
  88: {
    type: "馬",
    currPostion: 88,
    player: "红",
  },
  89: {
    type: "車",
    currPostion: 89,
    player: "红",
  },
};

const initData: Record<number, ChessItem | null> = {
  ...after,
  36: null,
  37: null,
  38: null,
  39: null,
  40: null,
  41: null,
  42: null,
  43: null,
  44: null,
  45: null,
  46: null,
  47: null,
  48: null,
  49: null,
  50: null,
  51: null,
  52: null,
  53: null,
  ...before,
};

export const useChess = () => {
  const [data, setData] = useState<Record<number, ChessItem | null>>(initData);
  const [next, setNext] = useState<number[]>([]);
  const [selected, setSelected] = useState<number>(-1);
  const playing = useRef<Player>("红");

  return {
    data,
    playing,
    next,
    selected,
    setSelected,
    setNext,
    setData,
  };
};
