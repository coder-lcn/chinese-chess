import { useMemo } from "react";
import { Chess } from "./App.styled";
import { ChessItem } from "./types";

export const RenderChess = ({
  item,
  first,
}: {
  item?: ChessItem | null;
  first: Ownner;
}) => {
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

  return <Chess first={isFirst}>{renderChessName.type}</Chess>;
};
