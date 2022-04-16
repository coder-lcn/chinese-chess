import { VirtualChessBoard, VirtualItem } from "./App.styled";
import { Checkerboard } from "./checkerboard";
import { RenderChess } from "./renderChess";
import { useChess } from "./useChess";
import { batchRender } from "./utils";

function App() {
  const { data, first } = useChess();

  return (
    <Checkerboard>
      <VirtualChessBoard>
        {batchRender(90).map((item) => (
          <VirtualItem key={item}>
            <RenderChess first={first} item={data[item]} />
          </VirtualItem>
        ))}
      </VirtualChessBoard>
    </Checkerboard>
  );
}

export default App;
