import { Container, Item, Wrapper, Text } from "./App.styled";
import { batchRender } from "./utils";

type Props = {
  children?: React.ReactNode;
};

export const Checkerboard: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Wrapper>
        {batchRender(72).map((i) => {
          const center = i > 31 && i < 39;
          let soldier;

          switch (i) {
            case 3:
            case 12:
            case 59:
            case 68:
              soldier = "lt";
              break;
            case 4:
            case 11:
            case 60:
            case 67:
              soldier = "rt";
              break;
          }

          let mark: Mark | undefined = undefined;
          let markOther: Mark | undefined = undefined;

          switch (i) {
            case 8:
            case 14:
            case 17:
            case 19:
            case 21:
            case 23:
            case 41:
            case 43:
            case 45:
            case 47:
            case 48:
            case 54:
              mark = "rb";
              break;
            case 9:
            case 15:
            case 16:
            case 18:
            case 20:
            case 22:
            case 40:
            case 42:
            case 44:
            case 46:
            case 49:
            case 55:
              mark = "lb";
              break;
            case 25:
            case 27:
            case 29:
            case 31:
            case 51:
            case 53:
            case 56:
            case 62:
              mark = "rt";
              break;
            case 24:
            case 26:
            case 28:
            case 30:
            case 50:
            case 52:
            case 57:
            case 63:
              mark = "lt";
              break;
          }

          if (mark) {
            switch (i) {
              case 16:
              case 22:
              case 49:
              case 55:
                markOther = "rt";
                break;
              case 17:
              case 23:
              case 48:
              case 54:
                markOther = "lt";
                break;
            }
          }

          return (
            <Item
              center={center}
              key={i}
              soldier={soldier}
              mark={mark}
              markOther={markOther}
            />
          );
        })}
      </Wrapper>
      <Text>
        <span>楚河</span>
        <span>汉界</span>
      </Text>
      {children}
    </Container>
  );
};
