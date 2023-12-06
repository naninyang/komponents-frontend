import styled from "@emotion/styled";
import { rem } from "@/styles/designSystem";

const Container = styled.header({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: `0 ${rem(25)}`,
  height: rem(52),
  "& .header": {},
});

export default function Header() {
  return (
    <Container>
      <div className='header container'>Header</div>
    </Container>
  );
}
