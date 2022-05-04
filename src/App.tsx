import { useRef } from "react";
import { VirtualChessBoard, VirtualItem } from "./App.styled";
import { Checkerboard } from "./checkerboard";
import { RenderChess } from "./renderChess";
import { ChessItem } from "./types";
import { useChess } from "./useChess";
import { batchRender, debounce, ChessLog, toOneRow } from "./utils";

function App() {
  const { data, playing, next, setNext, selected, setSelected, setPlaying } = useChess();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const moved = useRef<[number, number] | null>(null);
  // 棋子正在移动
  const loading = useRef(false);

  const selectChess = (item: ChessItem) => {
    if (loading.current) return;

    loading.current = true;
    setNext([]);
    setSelected(item.currPostion);

    switch (item.type) {
      case "兵": {
        const targetPosition = toOneRow(item.currPostion, true);

        if (targetPosition >= 0) {
          setNext([targetPosition]);
        }
        break;
      }
      case "卒": {
        const targetPosition = toOneRow(item.currPostion, false);
        if (targetPosition >= 0) {
          setNext([targetPosition]);
        }
        break;
      }
    }
  };

  const onNext = (position: number) => {
    if (loading.current) return;
    if (!containerRef.current) return;

    const nextElement = containerRef.current.children[position];
    if (!nextElement) return;

    const lastElement = containerRef.current.children[selected];
    if (!lastElement) return;

    const { left: targetLeft, top: targetTop } = nextElement.firstElementChild!.getBoundingClientRect();

    const { left: sourceLeft, top: sourceTop } = lastElement.firstElementChild!.getBoundingClientRect();

    let x = targetLeft - sourceLeft - 2;
    if (Math.abs(x) < 20) x = 0;

    let y = targetTop - sourceTop - 6;
    if (Math.abs(y) < 20) y = 0;

    (lastElement.firstElementChild as HTMLDivElement).style.transform = `translate(${x}px, ${y}px)`;

    moved.current = [selected, position];

    setSelected(-1);
    setNext([]);
  };

  const onTransition = () => {
    loading.current = false;

    if (moved.current && moved.current.length === 2) {
      const [start, end] = moved.current;

      data[end] = data[start];
      data[start] = null;

      ChessLog({
        start,
        end,
        chessType: data[end]!.type,
        player: playing,
      });
    }

    moved.current = null;
  };

  return (
    <Checkerboard>
      <VirtualChessBoard ref={containerRef} onTransitionEnd={debounce(onTransition)}>
        {batchRender(90).map((item) => (
          <VirtualItem key={item}>
            <RenderChess
              position={item}
              selected={selected}
              next={next.includes(item)}
              first={playing}
              item={data[item]}
              onClick={() => selectChess(data[item]!)}
              onNext={onNext}
            />
          </VirtualItem>
        ))}
      </VirtualChessBoard>
    </Checkerboard>
  );
}

export default App;
