export type ChessType =
  | "車"
  | "馬"
  | "炮"
  | "象"
  | "相"
  | "士"
  | "兵"
  | "卒"
  | "将"
  | "帥";

export interface ChessItem {
  type: ChessType;
  alive: boolean;
  currPostion: number;
  playing: Ownner;
}
