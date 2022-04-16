export const batchRender = (num: number) =>
  Array(num)
    .fill("")
    .map((_, i) => i);
