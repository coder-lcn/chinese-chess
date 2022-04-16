import { Container, Item, Wrapper, Text } from "./App.styled";

function App() {
  return (
    <Container>
      <Wrapper>
        {Array(72)
          .fill("")
          .map((_, i) => {
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

            return (
              <Item center={center} key={i} soldier={soldier}>
                {/* {i} */}
              </Item>
            );
          })}
      </Wrapper>
      <Text>
        <span>楚河</span>
        <span>汉界</span>
      </Text>
    </Container>
  );
}

export default App;
