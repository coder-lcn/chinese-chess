import { VirtualChessBoard, VirtualItem } from "./App.styled";
import { Checkerboard } from "./checkerboard";
import { RenderChess } from "./renderChess";
import { ChessItem } from "./types";
import { useChess } from "./useChess";
import { batchRender } from "./utils";

function App() {
  const { data, first, player } = useChess();

  const selectChess = (item: ChessItem) => {
    if (item.ownner !== player) return;
    // 选择要移动的棋子
  };

  return (
    <Checkerboard>
      <VirtualChessBoard>
        {batchRender(90).map((item) => (
          <VirtualItem key={item}>
            <RenderChess
              first={first}
              item={data[item]}
              onClick={() => selectChess(data[item]!)}
            />
          </VirtualItem>
        ))}
      </VirtualChessBoard>
    </Checkerboard>
  );
}

export default App;
