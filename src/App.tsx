import { useMemo, useRef } from "react";
import { VirtualChessBoard, VirtualItem } from "./App.styled";
import { Checkerboard } from "./checkerboard";
import { RenderChess } from "./renderChess";
import { ChessItem } from "./types";
import { useChess } from "./useChess";
import { batchRender, debounce, ChessLog, toOneRow, toOneCol } from "./utils";

function App() {
  const { data, playing, next, setNext, selected, setSelected, setData } = useChess();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const moved = useRef<[number, number] | null>(null);
  const loading = useRef(false);
  const lossedChessItem = useRef<ChessItem | null>(null);

  const selectChess = (item: ChessItem) => {
    if (item.currPostion === selected) return;
    if (item.player !== playing.current) return;
    if (loading.current) return;

    const position = item.currPostion;

    loading.current = true;
    setNext([]);
    setSelected(position);

    switch (item.type) {
      case "兵": {
        const targetPosition = toOneRow(position, true);
        const cols = toOneCol(position, item.type);
        if (targetPosition >= 0) {
          setNext([targetPosition, ...cols]);
        } else {
          setNext(cols);
        }
        break;
      }
      case "卒": {
        const targetPosition = toOneRow(position, false);
        const cols = toOneCol(position, item.type);
        if (targetPosition >= 0) {
          setNext([targetPosition, ...cols]);
        }
        break;
      }
      case "士": {
        const steps: number[] = [];

        if (playing.current === "红") {
          if (position === 76) {
            steps.push(66, 68, 84, 86);
          } else {
            steps.push(76);
          }
        } else {
          if (position === 13) {
            steps.push(3, 5, 21, 23);
          } else {
            steps.push(13);
          }
        }

        setNext(steps);
        break;
      }
    }
  };

  const onNext = (position: number) => {
    if (loading.current) return;
    if (!containerRef.current) return;

    const nextElement = containerRef.current.children[position];
    if (!nextElement) return;

    const lastElement = containerRef.current.children[selected] as HTMLDivElement;
    if (!lastElement) return;
    lastElement.style.zIndex = (+getComputedStyle(nextElement, null).zIndex || 0) + 100 + ""; // 确保要移动的棋子始终在视图上面

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

  const checkResult = () => {
    if (!lossedChessItem.current) return;

    const { type } = lossedChessItem.current;
    const gameOver = type === "将" || type === "帥";
    if (gameOver) {
      alert(`恭喜${playing.current === "红" ? "黑" : "红"}方获胜！！！`);
      location.reload();
    }
  };

  const onTransition = () => {
    loading.current = false;

    if (moved.current && moved.current.length === 2) {
      const [start, end] = moved.current;

      data[start]!.currPostion = end;
      data[end] = data[start];
      data[start] = null;

      ChessLog({
        start,
        end,
        chessType: data[end]!.type,
        player: playing.current,
      });

      playing.current = playing.current === "红" ? "黑" : "红";
      setData({ ...data });
      checkResult();
    }

    moved.current = null;
  };

  const onEat = (to: ChessItem) => {
    onNext(to.currPostion);
    lossedChessItem.current = to;
  };

  // 在 next 路径集合中，过滤掉己方的路径
  const filterPartner = useMemo(() => {
    return next.filter((item) => {
      const chess = data[item];
      if (chess) {
        return chess.player !== playing.current;
      } else {
        return true;
      }
    });
  }, [next]);

  return (
    <Checkerboard>
      <VirtualChessBoard ref={containerRef} onTransitionEnd={debounce(onTransition)}>
        {batchRender(90).map((item) => (
          <VirtualItem key={item}>
            <RenderChess
              position={item}
              selected={selected}
              next={filterPartner.includes(item)}
              item={data[item]}
              onClick={() => selectChess(data[item]!)}
              onNext={onNext}
              onEat={onEat}
            />
          </VirtualItem>
        ))}
      </VirtualChessBoard>
    </Checkerboard>
  );
}

export default App;
