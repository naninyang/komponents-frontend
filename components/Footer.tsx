import styled from "@emotion/styled";
import { rem } from "@/styles/designSystem";

const Container = styled.footer({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: `${rem(50)} ${rem(25)}`,
  "& .footer": {},
});

export default function Footer() {
  return (
    <Container>
      <div className='footer container'>Footer</div>
    </Container>
  );
}
