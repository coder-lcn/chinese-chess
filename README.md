# 中国象棋 - 单机版

## 定义类型

```typescript
type ChessType = "車" | "馬" | "炮" | "象" | "相" | "士" | "兵" | "卒" | "将" | "帥";

type Ownner = "a" | "b";

interface ChessItem {
  type: ChessType;
  currPostion: number;
  ownner: Ownner;
}
```

## 定义状态

- 游戏开始前

  - 为每一个可移动的坐标位置，初始化每一个棋子的 `ChessItem`
  - 定义两个玩家 a 和 b
  - 谁是先手

- 游戏进行中

  - 正在下棋的玩家
  - 选择要移动的棋子，标记一个 `ChessItem`
  - 嗅探所选择的棋子，可移动到的所有位置集合
  - 是否有棋子正在移动中
