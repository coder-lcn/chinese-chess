import { useMemo } from "react";
import { Chess, Next } from "./App.styled";
import { ChessItem } from "./types";

export const RenderChess = ({
  item,
  first,
  next,
  selected,
  position,
  onClick,
  onNext,
}: {
  item?: ChessItem | null;
  first: Ownner;
  next: boolean;
  selected: number;
  position: number;
  onClick: () => void;
  onNext: (position: number) => void;
}) => {
  if (next) {
    return <Next onClick={() => onNext(position)} />;
  }

  if (!item) return null;
  if (item.alive === false) return null;

  const isFirst = item.ownner === first;

  const renderChessName = useMemo(() => {
    if (isFirst) {
      if (item.type === "将") {
        item.type = "帥";
      }

      if (item.type === "象") {
        item.type = "相";
      }
    } else {
      if (item.type === "兵") {
        item.type = "卒";
      }
    }
    return item;
  }, [isFirst, item]);

  return (
    <Chess
      first={isFirst}
      onClick={onClick}
      selected={item.currPostion === selected}
    >
      {renderChessName.type}
    </Chess>
  );
};
