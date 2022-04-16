import { useState } from "react";
import { ChessItem } from "./types";

const initData: Record<number, ChessItem | null> = {
  0: {
    type: "車",
    currPostion: 0,
    alive: true,
    ownner: "a",
  },
  1: {
    type: "馬",
    currPostion: 1,
    alive: true,
    ownner: "a",
  },
  2: {
    type: "象",
    currPostion: 2,
    alive: true,
    ownner: "a",
  },
  3: {
    type: "士",
    currPostion: 3,
    alive: true,
    ownner: "a",
  },
  4: {
    type: "将",
    currPostion: 4,
    alive: true,
    ownner: "a",
  },
  5: {
    type: "士",
    currPostion: 5,
    alive: true,
    ownner: "a",
  },
  6: {
    type: "象",
    currPostion: 6,
    alive: true,
    ownner: "a",
  },
  7: {
    type: "馬",
    currPostion: 7,
    alive: true,
    ownner: "a",
  },
  8: {
    type: "車",
    currPostion: 8,
    alive: true,
    ownner: "a",
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
    alive: true,
    ownner: "a",
  },
  20: null,
  21: null,
  22: null,
  23: null,
  24: null,
  25: {
    type: "炮",
    currPostion: 25,
    alive: true,
    ownner: "a",
  },
  26: null,
  27: {
    type: "兵",
    currPostion: 27,
    alive: true,
    ownner: "a",
  },
  28: null,
  29: {
    type: "兵",
    currPostion: 29,
    alive: true,
    ownner: "a",
  },
  30: null,
  31: {
    type: "兵",
    currPostion: 31,
    alive: true,
    ownner: "a",
  },
  32: null,
  33: {
    type: "兵",
    currPostion: 33,
    alive: true,
    ownner: "a",
  },
  34: null,
  35: {
    type: "兵",
    currPostion: 35,
    alive: true,
    ownner: "a",
  },
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
  54: {
    type: "兵",
    currPostion: 54,
    alive: true,
    ownner: "b",
  },
  55: null,
  56: {
    type: "兵",
    currPostion: 56,
    alive: true,
    ownner: "b",
  },
  57: null,
  58: {
    type: "兵",
    currPostion: 58,
    alive: true,
    ownner: "b",
  },
  59: null,
  60: {
    type: "兵",
    currPostion: 60,
    alive: true,
    ownner: "b",
  },
  61: null,
  62: {
    type: "兵",
    currPostion: 62,
    alive: true,
    ownner: "b",
  },
  63: null,
  64: {
    type: "炮",
    currPostion: 64,
    alive: true,
    ownner: "b",
  },
  65: null,
  66: null,
  67: null,
  68: null,
  69: null,
  70: {
    type: "炮",
    currPostion: 70,
    alive: true,
    ownner: "b",
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
    alive: true,
    ownner: "b",
  },
  82: {
    type: "馬",
    currPostion: 82,
    alive: true,
    ownner: "b",
  },
  83: {
    type: "象",
    currPostion: 83,
    alive: true,
    ownner: "b",
  },
  84: {
    type: "士",
    currPostion: 84,
    alive: true,
    ownner: "b",
  },
  85: {
    type: "将",
    currPostion: 85,
    alive: true,
    ownner: "b",
  },
  86: {
    type: "士",
    currPostion: 86,
    alive: true,
    ownner: "b",
  },
  87: {
    type: "象",
    currPostion: 87,
    alive: true,
    ownner: "b",
  },
  88: {
    type: "馬",
    currPostion: 88,
    alive: true,
    ownner: "b",
  },
  89: {
    type: "車",
    currPostion: 89,
    alive: true,
    ownner: "b",
  },
};

export const useChess = () => {
  const [first, setFirst] = useState<Ownner>("b");
  const [data, setData] = useState<Record<number, ChessItem | null>>(initData);
  return { data, first };
};