import { useMemo, useRef } from "react";
import { VirtualChessBoard, VirtualItem } from "./App.styled";
import { Checkerboard } from "./checkerboard";
import { RenderChess } from "./renderChess";
import { ChessItem } from "./types";
import { useChess } from "./useChess";
import { batchRender, debounce, ChessLog, toOneRow, toOneCol, bossPosition } from "./utils";

function App() {
  const { data, playing, next, setNext, selected, setSelected, setData } = useChess();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const moved = useRef<[number, number] | null>(null);
  const loading = useRef(false);
  const lossedChessItem = useRef<ChessItem | null>(null);
  const debug = location.search.indexOf("debug") !== -1;

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
      case "相": {
        const newPosition = [position - 16, position + 16, position - 20, position + 20]
          .filter((item) => item > 46 && item < 88)
          .filter((item) => item !== 79 && item !== 73 && item !== 55);
        setNext(newPosition);
        break;
      }
      case "象": {
        const newPosition = [position - 16, position + 16, position - 20, position + 20]
          .filter((item) => item > 1 && item < 43)
          .filter((item) => item !== 10 && item !== 34);
        setNext(newPosition);
        break;
      }
      case "炮":
      case "車": {
        const currPosition = position % 9;
        const next: number[] = [];

        let markLeftPosition = position;
        let markRightPosition = position;
        let markTopPosition = position;
        let markBottomPosition = position;

        let left = currPosition;
        let right = currPosition;

        const 炮: Record<Position, { 炮架: ChessItem | null; enemy: ChessItem | null }> = {
          上: {
            炮架: null,
            enemy: null,
          },
          右: {
            炮架: null,
            enemy: null,
          },
          下: {
            炮架: null,
            enemy: null,
          },
          左: {
            炮架: null,
            enemy: null,
          },
        };

        const 车: Record<Position, ChessItem | null> = {
          上: null,
          右: null,
          下: null,
          左: null,
        };

        const filter_炮 = (index: number, pos: Position) => {
          if (item.type !== "炮") return;

          const target = data[index];

          if (炮[pos].炮架) {
            if (!炮[pos].enemy && target) {
              next.push(index);
              炮[pos].enemy = target;
            }
          } else {
            if (target) {
              炮[pos].炮架 = target;
            } else {
              next.push(index);
            }
          }
        };

        const filter_车 = (index: number, pos: Position) => {
          if (item.type !== "車") return;
          const target = data[index];
          if (车[pos]) return;

          if (!车[pos] && target) {
            车[pos] = target;
          }

          next.push(index);
        };

        while (left > 0) {
          const index = markLeftPosition - 1;
          filter_炮(index, "左");
          filter_车(index, "左");
          markLeftPosition--;
          left--;
        }

        while (right < 8) {
          const index = markRightPosition + 1;
          filter_炮(index, "右");
          filter_车(index, "右");
          markRightPosition++;
          right++;
        }

        while (markTopPosition - 9 > 0) {
          const index = markTopPosition - 9;
          filter_炮(index, "上");
          filter_车(index, "上");
          markTopPosition -= 9;
        }

        while (markBottomPosition + 9 < 90) {
          const index = markBottomPosition + 9;
          filter_炮(index, "下");
          filter_车(index, "下");
          markBottomPosition += 9;
        }

        setNext(next);

        break;
      }
      case "帥":
      case "将": {
        const top = item.type === "将" ? position + 9 : position - 9;
        const left = position - 1;
        const right = position + 1;
        const bottom = item.type === "将" ? position - 9 : position + 9;

        const next = bossPosition([top, left, right, bottom]);
        setNext(next);
        break;
      }
      case "馬": {
        const next: number[] = [];

        const top = position - 9;
        const topTarget = Boolean(data[top]);
        if (topTarget === false) {
          const leftTop = position - 18 - 1;
          const rightTop = position - 18 + 1;
          next.push(leftTop, rightTop);
        }

        const left = position - 1;
        const leftTarget = Boolean(data[left]);
        if (leftTarget === false) {
          const leftTop = position - 2 - 9;
          const leftBottom = position - 2 + 9;
          next.push(leftTop, leftBottom);
        }

        const bottom = position + 9;
        const bottomTarget = Boolean(data[bottom]);
        if (bottomTarget === false) {
          const leftBottom = position + 18 - 1;
          const rightBottom = position + 18 + 1;
          next.push(rightBottom, leftBottom);
        }

        const right = position + 1;
        const rightTarget = Boolean(data[right]);
        if (rightTarget === false) {
          const rightTop = position + 2 - 9;
          const rightBottom = position + 2 + 9;
          next.push(rightBottom, rightTop);
        }

        setNext(next);
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
        {batchRender(90).map((item, i) => (
          <VirtualItem key={item}>
            {debug && <span>{i}</span>}
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
