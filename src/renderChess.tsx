import { Chess, Next } from "./App.styled";
import { ChessItem } from "./types";

export const RenderChess = ({
  item,
  next,
  selected,
  position,
  onClick,
  onNext,
  onEat,
}: {
  item?: ChessItem | null;
  next: boolean;
  selected: number;
  position: number;
  onClick: () => void;
  onNext: (position: number) => void;
  onEat: (item: ChessItem) => void;
}) => {
  // 渲染行进路线
  if (next && Boolean(item) === false) {
    return <Next onClick={() => onNext(position)} />;
  }

  if (!item) return null;

  return (
    <Chess first={item.player === "红"} onClick={onClick} selected={item.currPostion === selected}>
      {item.type}
      {next && <Next onClick={() => onEat(item)} />}
    </Chess>
  );
};
